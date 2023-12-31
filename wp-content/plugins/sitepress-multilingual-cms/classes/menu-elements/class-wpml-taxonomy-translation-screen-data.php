<?php

class WPML_Taxonomy_Translation_Screen_Data extends WPML_WPDB_And_SP_User {

	const WPML_TAXONOMY_TRANSLATION_MAX_TERMS_RESULTS_SET = 1000;

	/** @var  string $taxonomy */
	private $taxonomy;

	/**
	 * WPML_Taxonomy_Translation_Screen_Data constructor.
	 *
	 * @param SitePress $sitepress
	 * @param string    $taxonomy
	 */
	public function __construct( &$sitepress, $taxonomy ) {
		$wpdb = $sitepress->wpdb();
		parent::__construct( $wpdb, $sitepress );
		$this->taxonomy = $taxonomy;
	}

	/**
	 * The returned array from this function is indexed as follows.
	 * It holds an array of all terms to be displayed under [terms]
	 * and the count of all terms matching the filter under [count].
	 *
	 * The array under [terms] itself is index as such:
	 * [trid][lang]
	 *
	 * It holds in itself the terms objects of the to be displayed terms.
	 * These are ordered by their names alphabetically.
	 * Also their objects are amended by the index $term->translation_of holding the term_taxonomy_id of their original element
	 * and their level under $term->level in case of hierarchical terms.
	 *
	 * Also the index [trid][source_lang] holds the source language of the term group.
	 *
	 * @return array
	 */
	public function terms() {
		$terms_data                  = array(
			'truncated' => 0,
			'terms'     => array(),
		);
		$attributes_to_select        = array();
		$icl_translations_table_name = $this->wpdb->prefix . 'icl_translations';

		$attributes_to_select[ $this->wpdb->terms ]           = array(
			'alias' => 't',
			'vars'  => array( 'name', 'slug', 'term_id' ),
		);
		$attributes_to_select[ $this->wpdb->term_taxonomy ]   = array(
			'alias' => 'tt',
			'vars'  => array(
				'term_taxonomy_id',
				'parent',
				'description',
			),
		);
		$attributes_to_select[ $icl_translations_table_name ] = array(
			'alias' => 'i',
			'vars'  => array(
				'language_code',
				'trid',
				'source_language_code',
			),
		);

		$query_limit_cap = defined( 'WPML_TAXONOMY_TRANSLATION_MAX_TERMS_RESULTS_SET' ) ?
			WPML_TAXONOMY_TRANSLATION_MAX_TERMS_RESULTS_SET : self::WPML_TAXONOMY_TRANSLATION_MAX_TERMS_RESULTS_SET;

		$join_statements   = array();
		$as                = $this->alias_statements( $attributes_to_select );
		$join_statements[] = "{$as['t']} JOIN {$as['tt']} ON tt.term_id = t.term_id";
		$join_statements[] = "{$as['i']} ON i.element_id = tt.term_taxonomy_id";
		$from_clause       = $this->build_from_clause( join( ' JOIN ', $join_statements ), $attributes_to_select, $query_limit_cap );
		$select_clause     = $this->build_select_vars( $attributes_to_select );
		$where_clause      = $this->build_where_clause( $attributes_to_select );
		$full_statement    = "SELECT SQL_CALC_FOUND_ROWS {$select_clause} FROM {$from_clause} WHERE {$where_clause}";

		$all_terms = $this->wpdb->get_results( $full_statement );

		$real_terms_count = (int) $this->wpdb->get_var( 'SELECT FOUND_ROWS()' );
		if ( $real_terms_count > $query_limit_cap ) {
			$terms_data['truncated'] = 1;
		}

		if ( ! is_array( $all_terms ) ) {
			return $terms_data;
		}

		if ( function_exists( 'get_term_meta' ) ) {
			$all_terms = $this->add_metadata( $all_terms );
		}
		if ( $all_terms ) {
			$terms_data['terms'] = $this->order_terms_list( $this->index_terms_array( $all_terms ) );
		}

		return $terms_data;
	}

	/**
	 * @param array $terms
	 *               Turn a numerical array of terms objects into an associative once,
	 *               holding the same terms, but indexed by their term_id.
	 *
	 * @return array
	 */
	private function index_terms_array( $terms ) {
		$terms_indexed = array();

		foreach ( $terms as $term ) {
			$terms_indexed[ $term->term_id ] = $term;
		}

		return $terms_indexed;
	}

	/**
	 * @param array $trid_group
	 * @param array $terms
	 *                    Transforms the term arrays generated by the Translation Tree class and turns them into
	 *                    standard WordPress terms objects.
	 *
	 * @return mixed
	 */
	private function set_language_information(
		$trid_group,
		$terms
	) {

		foreach ( $trid_group['elements'] as $lang => $term ) {

			$term_object         = $terms[ $term['term_id'] ];
			$term_object->level  = $term['level'];
			$trid_group[ $lang ] = $term_object;
		}

		unset( $trid_group['elements'] );

		return $trid_group;
	}

	/**
	 * Orders a list of terms alphabetically and hierarchy-wise
	 *
	 * @param array $terms
	 *
	 * @return array
	 */
	private function order_terms_list( $terms ) {
		$terms_tree    = new WPML_Translation_Tree(
			$this->sitepress,
			$this->taxonomy,
			$terms
		);
		$ordered_terms = $terms_tree->get_alphabetically_ordered_list();
		foreach ( $ordered_terms as $key => $trid_group ) {
			$ordered_terms[ $key ] = self::set_language_information(
				$trid_group,
				$terms
			);
		}

		return $ordered_terms;
	}

	/**
	 * @param array $selects
	 *                 Generates a list of to be selected variables in an sql query.
	 *
	 * @return string
	 */
	private function build_select_vars( $selects ) {
		$output = '';

		if ( is_array( $selects ) ) {
			$coarse_selects = array();

			foreach ( $selects as $select ) {

				$vars  = $select['vars'];
				$table = $select['alias'];

				foreach ( $vars as $key => $var ) {
					$vars[ $key ] = $table . '.' . $var;
				}
				$coarse_selects[] = join( ', ', $vars );
			}

			$output = join( ', ', $coarse_selects );
		}

		return $output;
	}

	/**
	 * @param array $selects
	 *                 Returns an array of alias statements to be used in SQL queries with joins.
	 *
	 * @return array
	 */
	private function alias_statements( $selects ) {
		$output = array();
		foreach ( $selects as $key => $select ) {
			$output[ $select['alias'] ] = $key . ' AS ' . $select['alias'];
		}

		return $output;
	}

	private function build_where_clause( $selects ) {

		$where_clauses[] = $selects[ $this->wpdb->term_taxonomy ]['alias']
						. $this->wpdb->prepare(
							'.taxonomy = %s ',
							$this->taxonomy
						);
		$where_clauses[] = $selects[ $this->wpdb->prefix . 'icl_translations' ]['alias']
						. $this->wpdb->prepare(
							'.element_type = %s ',
							'tax_' . $this->taxonomy
						);

		$where_clause = join( ' AND  ', $where_clauses );

		return $where_clause;
	}

	/**
	 * @param string $from
	 * @param array  $selects
	 * @param int    $limit
	 *
	 * @return string
	 */
	private function build_from_clause( $from, $selects, $limit ) {
		return $from . sprintf(
			" INNER JOIN (
					SELECT trid FROM %s WHERE element_type = '%s' AND source_language_code IS NULL LIMIT %d
				  ) lm on lm.trid = %s.trid",
			$this->wpdb->prefix . 'icl_translations',
			'tax_' . $this->taxonomy,
			$limit,
			$selects[ $this->wpdb->prefix . 'icl_translations' ]['alias']
		);
	}

	/**
	 * @param array $all_terms
	 *
	 * @return array
	 */
	private function add_metadata( $all_terms ) {

		$setting_factory = $this->sitepress->core_tm()->settings_factory();

		foreach ( $all_terms as $term ) {
			$meta_data = get_term_meta( $term->term_id );
			foreach ( $meta_data as $meta_key => $meta_data ) {
				if ( in_array( $setting_factory->term_meta_setting( $meta_key )->status(), array( WPML_TRANSLATE_CUSTOM_FIELD, WPML_COPY_ONCE_CUSTOM_FIELD ), true ) ) {
					$term->meta_data[ $meta_key ] = $meta_data;
				}
			}
		}

		return $all_terms;
	}
}
