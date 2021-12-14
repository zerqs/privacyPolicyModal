class GDPR {

    constructor(jsonData, htmlParent, formConfig) {

        this.jsonData = jsonData
        this.parent = document.getElementById(htmlParent);
        this.formConfig = formConfig
        this.popup = ''
        this.storageMedium = this.getStorageType()
        this.createFields()
            .createButtons()
            .init()
            .setFormPreferences()
    }

    createFields() {

        for (var key in this.jsonData) {
            if (this.jsonData.hasOwnProperty(key)) {
                switch (key) {
                    case 'header':
                        this.createHeader(this.jsonData[key])
                        break;
                    case 'declaration':
                        this.createDeclaration(this.jsonData[key])
                        break;
                    case 'categorys':
                        for (var key2 in this.jsonData[key]) {
                            if (this.jsonData[key].hasOwnProperty(key2)) {
                                this.createCookieCategory(key2, this.jsonData[key][key2])
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return this
    }
    createHeader(text) {
        this.popup += `<form id="tos-form"><div class="tos-header"><h3> ${text}</h3></div>`;
        return this;
    }
    createDeclaration(text) {
        this.popup += `<div class="explain-use"><p>${text}</p></div>`;
        return this
    }
    createCookieCategory(category, text) {
        this.popup += `<div class="category"><div class="content">
    <label class="bold">${category}</label><p>${text} <p>
    </div><label class="switch"><input type="checkbox" value="1" checked name="${category}">
    <span class="slider"></span></label></div>`;
        return this;
    }

    setFormPreferences() {

        const form = document.getElementById(this.formConfig.formId)

        if (this.formConfig.storageType.getItem(this.formConfig.storageKey)) {
            form.parentNode.classList.add('hidden')

        } else {
            
        }
        //add eventlistener to accept btn
        form.addEventListener('change', (e) => {

            if (e.target.type == 'checkbox') {
                e.target.value = this.toggleCheckbox(e.target)
            }
        })
        form.addEventListener('click', (e) => {

            if (e.target.tagName == 'BUTTON') {
                e.preventDefault();

                
                if (this.formConfig.storageType.getItem(this.formConfig.storageKey)) {
                    this.sendFormData(form)
                    
                    form.parentNode.classList.add('hidden')

                } else {
                    this.formConfig.storageType.setItem(this.formConfig.storageKey,true)
                    this.sendFormData(form)
                    form.parentNode.classList.add('hidden')
                }
            }
        })
        return this
    }
    sendFormData(data) {
        let formData = new FormData();
        Array.from(data).forEach(element => {
            if (element.type == 'checkbox') {
                
                formData.append(element.name, element.value)
            }
        });

        fetch(this.formConfig.url, {
            method: this.formConfig.method,
            mode: this.formConfig.mode,
            credentials: this.formConfig.credentials,
            headers: this.formConfig.headers, //headers is a object
            body: formData

        })
    }
    getStorageType() {

        switch (this.jsonData.storageType) {
            case 'localStorage':
                return window.localStorage
                break;
            case 'session':
                return sessionStorage
                break;
            case 'cookie':
                return document.cookie
                break;
            default:
                return localStorage;
                break;
        }
    }
    init() {
        this.parent.innerHTML += this.popup;
        return this
    }
    createButtons() {
        this.popup += `<div class="button-wrapper">
    <button class="is-info" id="acceptBtn"> Accept </button>
    <button class="is-danger"id="rejectBtn"> Decline </button>
    </div> </form>`;
        return this
    }
    
    toggleCheckbox(element) {
        switch (element.value) {
            case "1":
                return "0"
                break;
            case "0":
                return "1"
                break;
            default:
                return "1"
                break;
        }
    }
}

let gdpr = new GDPR({
    "header": "Cookie Policy v2.0",
    "declaration": "This is the declaration under main header",
    "categorys": {
        "Esssential": "essence text",
        "Functionality": "function text",
        "Analytical": "analytical text",
        "Marketing": "marketing text"
    },
}, 'privacyPopup', {
    "storageType": window.localStorage,
    "storageKey": "p_consent",
    "formId": "tos-form",
    "url": "/test/data",
    "method": "POST",
    "mode": "no-cors",
    "credentials": "same-origin",
    "headers": {
        "Content-Type": "application/json"
    }
})