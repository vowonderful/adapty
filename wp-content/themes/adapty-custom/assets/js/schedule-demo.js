document.addEventListener('DOMContentLoaded', function() {
    const cf = Vue.createApp({
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                companyName: '',
                companySize: '',
                isPhoneFieldFocused: false,
                fieldErrors: {
                    firstName: false,
                    lastName: false,
                    email: false,
                    phoneNumber: false,
                    companyName: false,
                    companySize: false
                },
                fieldCheck: {
                    firstName: false,
                    lastName: false,
                    email: false,
                    phoneNumber: false,
                    companyName: false,
                    companySize: false
                }
            };
        },
        methods: {
            validateAndFormatInput(event, regex) {
                event.target.value = event.target.value.replace(regex, '');
            },
            validateField(fieldName, data, blur = false) {
                let fieldValue = this[fieldName];
                const minLength = 2;
                const maxLength = 64;

                if (data && data?.[0] !== false && data?.[1] !== false) {
                    fieldValue = data[0];
                    const event = data[0];
                    const regex = data[1];
                    event.target.value = event.target.value.replace(regex, '');
                    fieldValue = event.target.value;
                }

                if (blur === true) {
                    this.fieldCheck[fieldName] = true;
                }

                if (!this.fieldCheck[fieldName]) {
                    return false;
                }

                if (fieldValue === '') {
                    this.fieldErrors[fieldName] = true;
                } else {
                    this.fieldErrors[fieldName] = false;

                    // Additional validation for First Name and Last Name
                    if (fieldName === 'firstName' || fieldName === 'lastName') {
                        // Allow only Latin letters, dots, and dashes
                        const nameRegex = /^[A-Za-z.\-]+$/;
                        if (!nameRegex.test(fieldValue)) {
                            this.fieldErrors[fieldName] = true;
                        }
                    }

                    // Validation for Phone Number
                    if (fieldName === 'phoneNumber') {
                        // Allow only digits and optional "+" at the beginning
                        const phoneRegex = /^\+?\d[\d\s()+-]*$/;
                        if (!phoneRegex.test(fieldValue)) {
                            this.fieldErrors[fieldName] = true;
                        } else if (fieldValue.length < 5 || fieldValue.length > 24) {
                            // Additional validation for phone number length
                            this.fieldErrors[fieldName] = true;
                        }
                    }

                    // Validation for Work Email
                    if (fieldName === 'email') {
                        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                        if (!emailRegex.test(fieldValue)) {
                            this.fieldErrors[fieldName] = true;
                        }
                    }

                    // Validation for Company Name
                    if (fieldName === 'companyName') {
                        const allowedRegex = /^[A-Za-z.\-\d\s(),]+$/;
                        if (!allowedRegex.test(fieldValue)) {
                            this.fieldErrors[fieldName] = true;
                        }
                    }

                    // Validation for minimum and maximum length
                    const $isHasLightError = fieldValue.length < minLength || fieldValue.length > maxLength;
                    if (fieldName !== 'companySize' && $isHasLightError) {
                        this.fieldErrors[fieldName] = true;
                    }
                }
            },
            submitForm() {
                // Form validation
                for (const field in this.fieldErrors) {
                    this.fieldCheck[field] = true;
                    this.validateField(field);
                }

                // Check for errors
                if (Object.values(this.fieldErrors).some(error => error)) {
                    alert('Please fill in all the fields correctly.');
                    return;
                }

                // Send data to the server via AJAX
                let formData = new FormData();
                formData.append('action', 'submit_schedule_demo');
                formData.append('first_name', this.firstName);
                formData.append('last_name', this.lastName);
                formData.append('email', this.email);
                formData.append('phone_number', this.phoneNumber);
                formData.append('company_name', this.companyName);
                formData.append('company_size', this.companySize);

                // Send data to backend and get result status:
                // fetch(ajax_object.ajax_url, {
                //     method: 'POST',
                //     body: formData
                // })
                // .then(response => {})
                // .catch(error => {});

                const submitButton = document.querySelector('.demo-contact-form button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                const successText = submitButton.getAttribute('data-success-text');
                submitButton.textContent = successText;
                submitButton.classList.add('success');

                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.phoneNumber = '';
                this.companyName = '';
                this.companySize = '';

                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.classList.remove('success');
                }, 2000);
            }
        }
    });

    cf.mount('.demo-contact-form');
});


jQuery(document).ready(function () {
    const phoneInput = document.querySelector("#phoneNumber");
    let flag = 0;
    const iti = window.intlTelInput(phoneInput, {
        formatOnDisplay: true,
        // geoIpLookup: function(callback) {
        //     fetch("https://ipapi.co/json")
        //         .then(function(res) { return res.json(); })
        //         .then(function(data) {
        //             //let countryCode = data.country_calling_code;
        //             //phoneInput.value = countryCode ? countryCode : '';
        //             callback(data.country_code);
        //         })
        //         .catch(function() { callback("pl"); });
        // },
        // initialCountry: "auto",
        localizedCountries: {
            ac: "Ascension Island",
            ad: "Andorra",
            ae: "United Arab Emirates",
            af: "Afghanistan",
            ag: "Antigua and Barbuda",
            ai: "Anguilla",
            al: "Albania",
            am: "Armenia",
            ao: "Angola",
            ar: "Argentina",
            as: "American Samoa",
            at: "Austria",
            au: "Australia",
            aw: "Aruba",
            ax: "Åland Islands",
            az: "Azerbaijan",
            ba: "Bosnia and Herzegovina",
            bb: "Barbados",
            bd: "Bangladesh",
            be: "Belgium",
            bf: "Burkina Faso",
            bg: "Bulgaria",
            bh: "Bahrain",
            bi: "Burundi",
            bj: "Benin",
            bl: "Saint Barthélemy",
            bm: "Bermuda",
            bn: "Brunei",
            bo: "Bolivia",
            bq: "Caribbean Netherlands",
            br: "Brazil",
            bs: "Bahamas",
            bt: "Bhutan",
            bw: "Botswana",
            by: "Belarus",
            bz: "Belize",
            ca: "Canada",
            cc: "Cocos",
            cd: "Congo",
            cf: "Central African Republic",
            cg: "Congo",
            ch: "Switzerland",
            ci: "Côte d’Ivoire",
            ck: "Cook Islands",
            cl: "Chile",
            cm: "Cameroon",
            cn: "China",
            co: "Colombia",
            cr: "Costa Rica",
            cu: "Cuba",
            cv: "Cape Verde",
            cw: "Curaçao",
            cx: "Christmas Island",
            cy: "Cyprus",
            cz: "Czech Republic",
            de: "Germany",
            dj: "Djibouti",
            dk: "Denmark",
            dm: "Dominica",
            do: "Dominican Republic",
            dz: "Algeria",
            ec: "Ecuador",
            ee: "Estonia",
            eg: "Egypt",
            eh: "Western Sahara",
            er: "Eritrea",
            es: "Spain",
            et: "Ethiopia",
            fi: "Finland",
            fj: "Fiji",
            fk: "Falkland Islands",
            fm: "Micronesia",
            fo: "Faroe Islands",
            fr: "France",
            ga: "Gabon",
            gb: "United Kingdom",
            gd: "Grenada",
            ge: "Georgia",
            gf: "French Guiana",
            gg: "Guernsey",
            gh: "Ghana",
            gi: "Gibraltar",
            gl: "Greenland",
            gm: "Gambia",
            gn: "Guinea",
            gp: "Guadeloupe",
            gq: "Equatorial Guinea",
            gr: "Greece",
            gt: "Guatemala",
            gu: "Guam",
            gw: "Guinea-Bissau",
            gy: "Guyana",
            hk: "Hong Kong",
            hn: "Honduras",
            hr: "Croatia",
            ht: "Haiti",
            hu: "Hungary",
            id: "Indonesia",
            ie: "Ireland",
            il: "Israel",
            im: "Isle of Man",
            in: "India",
            io: "British Indian Ocean Territory",
            iq: "Iraq",
            ir: "Iran",
            is: "Iceland",
            it: "Italy",
            je: "Jersey",
            jm: "Jamaica",
            jo: "Jordan",
            jp: "Japan",
            ke: "Kenya",
            kg: "Kyrgyzstan",
            kh: "Cambodia",
            ki: "Kiribati",
            km: "Comoros",
            kn: "Saint Kitts and Nevis",
            kp: "North Korea",
            kr: "South Korea",
            kw: "Kuwait",
            ky: "Cayman Islands",
            kz: "Kazakhstan",
            la: "Laos",
            lb: "Lebanon",
            lc: "Saint Lucia",
            li: "Liechtenstein",
            lk: "Sri Lanka",
            lr: "Liberia",
            ls: "Lesotho",
            lt: "Lithuania",
            lu: "Luxembourg",
            lv: "Latvia",
            ly: "Libya",
            ma: "Morocco",
            mc: "Monaco",
            md: "Moldova",
            me: "Montenegro",
            mf: "Saint Martin",
            mg: "Madagascar",
            mh: "Marshall Islands",
            mk: "North Macedonia",
            ml: "Mali",
            mm: "Myanmar",
            mn: "Mongolia",
            mo: "Macau",
            mp: "Northern Mariana Islands",
            mq: "Martinique",
            mr: "Mauritania",
            ms: "Montserrat",
            mt: "Malta",
            mu: "Mauritius",
            mv: "Maldives",
            mw: "Malawi",
            mx: "Mexico",
            my: "Malaysia",
            mz: "Mozambique",
            na: "Namibia",
            nc: "New Caledonia",
            ne: "Niger",
            nf: "Norfolk Island",
            ng: "Nigeria",
            ni: "Nicaragua",
            nl: "Netherlands",
            no: "Norway",
            np: "Nepal",
            nr: "Nauru",
            nu: "Niue",
            nz: "New Zealand",
            om: "Oman",
            pa: "Panama",
            pe: "Peru",
            pf: "French Polynesia",
            pg: "Papua New Guinea",
            ph: "Philippines",
            pk: "Pakistan",
            pl: "Poland",
            pm: "Saint Pierre and Miquelon",
            pr: "Puerto Rico",
            ps: "Palestine",
            pt: "Portugal",
            pw: "Palau",
            py: "Paraguay",
            qa: "Qatar",
            re: "Réunion",
            ro: "Romania",
            rs: "Serbia",
            ru: "Russia",
            rw: "Rwanda",
            sa: "Saudi Arabia",
            sb: "Solomon Islands",
            sc: "Seychelles",
            sd: "Sudan",
            se: "Sweden",
            sg: "Singapore",
            sh: "Saint Helena",
            si: "Slovenia",
            sj: "Svalbard and Jan Mayen",
            sk: "Slovakia",
            sl: "Sierra Leone",
            sm: "San Marino",
            sn: "Senegal",
            so: "Somalia",
            sr: "Suriname",
            ss: "South Sudan",
            st: "São Tomé and Príncipe",
            sv: "El Salvador",
            sx: "Sint Maarten",
            sy: "Syria",
            sz: "Eswatini",
            tc: "Turks and Caicos Islands",
            td: "Chad",
            tg: "Togo",
            th: "Thailand",
            tj: "Tajikistan",
            tk: "Tokelau",
            tl: "Timor-Leste",
            tm: "Turkmenistan",
            tn: "Tunisia",
            to: "Tonga",
            tr: "Turkey",
            tt: "Trinidad and Tobago",
            tv: "Tuvalu",
            tw: "Taiwan",
            tz: "Tanzania",
            ua: "Ukraine",
            ug: "Uganda",
            us: "United States",
            uy: "Uruguay",
            uz: "Uzbekistan",
            va: "Vatican City",
            vc: "Saint Vincent and the Grenadines",
            ve: "Venezuela",
            vg: "British Virgin Islands",
            vi: "U.S. Virgin Islands",
            vn: "Vietnam",
            vu: "Vanuatu",
            wf: "Wallis and Futuna",
            ws: "Samoa",
            xk: "Kosovo",
            ye: "Yemen",
            yt: "Mayotte",
            za: "South Africa",
            zm: "Zambia",
            zw: "Zimbabwe",
        },
        autoInsertDialCode: true,
        preferredCountries: ['au', 'ca', 'us'],
        utilsScript: '/wp-content/themes/adapty-custom/assets/js/intlTelInput.utils.js',
    });


    function setDefaultCountry() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://ipapi.co/json/', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let countryCode = data.country_calling_code;
                let countryISO2 = data.country_code;

                iti.setCountry(countryISO2);
                phoneInput.value = countryCode ? countryCode : '';
            }
        }
        xhr.send();
    }

    setDefaultCountry()

    phoneInput.addEventListener('input', function () {
        const format = phoneInput.getAttribute('placeholder');
        formatPhoneNumber(format);
    });


    function formatPhoneNumber(format) {
        let selectedCountry = iti.getSelectedCountryData();
        let dialCode = selectedCountry.dialCode;
        let phoneNumber = phoneInput.value.replace(/[^0-9]/g, '');;

        let formattedNumber = '';
        let formatIndex = 0;
        let formatReplaced = '+' + dialCode + "*" + format.replaceAll(' ', '*');
        let i = 0;

        if (!selectedCountry.dialCode) {
            phoneInput.value = '+' + phoneNumber;
            return;
        }

        if (selectedCountry.iso2 === 'by') {
            formatReplaced = '+375*(29)*111-11-11';
        }
        if (selectedCountry.iso2 === 'ru') {
            formatReplaced = '+7*(111)*111-11-11';
        }
        if (selectedCountry.iso2 === 'pl') {
            formatReplaced = "+48*(111)*111*111";
        }

        while (i < phoneNumber.length) {
            if (formatIndex >= formatReplaced.length) {
                break;
            }
            if (
                +formatReplaced[formatIndex] ||
                +formatReplaced[formatIndex] === 0
            ) {
                formattedNumber += phoneNumber[i];
                i += 1;
            } else {
                if (formatReplaced[formatIndex] === '*') {
                    formattedNumber += ' ';
                } else formattedNumber += formatReplaced[formatIndex];
            }
            formatIndex += 1;
        }
        phoneInput.value = formattedNumber;
    }

    let flagContainer = document.querySelector('.iti__flag-container');

    flagContainer.addEventListener('click', function () {
        if (flag === 0) {
            flag += 1;
        } else {
            let selectedCountry = iti.getSelectedCountryData();
            phoneInput.value = "+" + selectedCountry.dialCode;
            flag -= 1;
        }
    });

    // phoneInput.addEventListener('input', function() {
    //     const phoneNumber = phoneInput.value.trim();
    //     const plusCount = (phoneNumber.match(/\+/g) || []).length;
    //     const selectedCountry = iti.getSelectedCountryData();
    //     const isEnterCodeNow = typeof selectedCountry?.dialCode?.length === 'undefined'
    //         || (phoneInput.value.length - 1) < selectedCountry?.dialCode?.length;
    //
    //     if (phoneNumber === '') {
    //         phoneInput.value = '';
    //     } else if (plusCount > 1) {
    //         phoneInput.value = '+' + phoneNumber.replace(/\+/g, '');
    //     } else if (phoneNumber.charAt(0) !== '+') {
    //         phoneInput.value = '+' + phoneNumber;
    //     }
    //
    //     if (selectedCountry && selectedCountry.dialCode) {
    //         let newPlaceholder = intlTelInputUtils.getExampleNumber(
    //             selectedCountry.iso2,
    //             true,
    //             intlTelInputUtils.numberFormat.INTERNATIONAL
    //         );
    //         if (selectedCountry.iso2 === 'by') {
    //             newPlaceholder = "(29) 000-00-00";
    //         }
    //         if (selectedCountry.iso2 === 'pl') {
    //             newPlaceholder = "(000) 000 000";
    //         }
    //
    //         let mask = selectedCountry.dialCode
    //             ? '+' + selectedCountry.dialCode + ' ' + newPlaceholder.replace(/[1-9]/g, '0')
    //             : newPlaceholder.replace(/[1-9]/g, '0');
    //
    //         jQuery(phoneInput).mask(mask);
    //     }
    // });
});