<?php

/**
 * Gets a list of folders in the specified directory.
 * To be excluded from the list, a file or directory must start with a hash mark (#).
 *
 * @author Vladimir Mihalevich <mihalevich.dev@gmail.com>
 *
 * @param string $in_dir Specified directory in which to get all directories.
 * @return array Array with paths to all found directories.
 */
function get_dirs(string $in_dir): array
{
    return get_all($in_dir, 'dirs');
}

/**
 * Gets a list of files in the specified directory.
 * To be excluded from the list, a file or directory must start with a hash mark (#).
 *
 * @author Vladimir Mihalevich <mihalevich.dev@gmail.com>
 *
 * @param string $in_dir Specified directory in which to get all files.
 * @return array Array with paths to all found files.
 */
function get_files(string $in_dir): array
{
    return get_all($in_dir, 'files');
}

/**
 * Gets a list of files in the specified directory.
 * To be excluded from the list, a file or directory must start with a hash mark (#).
 *
 * @author Vladimir Mihalevich <mihalevich.dev@gmail.com>
 *
 * @param string $in_dir Specified directory in which to get all files.
 * @param string $types [all|dirs|files] What type to consider when forming a list:
 *                      all -- a list of all files and all folders in the specified directory will be displayed;
 *                      dirs -- a list of only folders that are located in the specified directory will be displayed;
 *                      files -- a list of all files located in the specified directory will be displayed.
 *                      P.S.: except for those that start with a lattice (#) [for example, "#name"].
 * @return array Array with paths to all found files.
 */
function get_all(string $in_dir, string $types = 'all'): array
{
    $filenames = [];
    $in_dir = rtrim( $in_dir, '/' );

    if ( !is_dir($in_dir) )
        return $filenames;

    $handle = opendir($in_dir);
    if ( !$handle )
        return $filenames;

    $filenames = collect_filenames($handle, $in_dir, $types);

    closedir($handle);

    return $filenames;
}

function collect_filenames($handle, string $in_dir, string $types): array
{
    $filenames = [];
    chdir($in_dir);

    while (false !== ($file = readdir($handle))) {
        if ($file != '.' && $file != '..' && $file[0] !== '#') {
            $tempFilenames = collect_everything_suitable($file, $in_dir, $types);
            $filenames = array_merge($filenames, $tempFilenames);
        }
    }

    chdir('../');

    return $filenames;
}

function collect_everything_suitable($file, string $in_dir, string $types): array
{
    $filenames = [];
    $is_dir = is_dir($file);
    if (($is_dir && ($types === 'dirs' || $types === 'dir'))
        || (!$is_dir && ($types === 'files' || $types === 'file'))
        || $types === 'all') {
        $filenames[] = $in_dir . '/' . $file;
    }

    return $filenames;
}