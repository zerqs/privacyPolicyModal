<b>GDPR / Privacy Policy Modal</b>


<ol>
<li>About</li>
<li>Install</li>
<li>Contribute</li>
</ol>


<h3>About<h3>
<p>Simple Privacy Policy / GDPR Popup</p>
<img src="https://github.com/zerqs/privacyPolicyModal/blob/main/screenshot/screenshot.PNG" alt="screenshot.png">


<h3>Install</h3>

<p>Download the files</p>
<p><b>P.S</b> You can download and run the modal as is if you wish to see it in action.</p>
<p>just open index.html with your live server option</p>
<p>Put the files in your project</p>
<p> add  the javascript file to your  page.</p>
<pre>
<code>
<script src="./privacy-popup/js/privacy.js"></script>
</code>
</pre>
<p> add a div to your page where the modl will live</p>  

```html
<div id ="privacyPopup" class="privacy-popup ">
    ````

<p> The modal takes two json objects </p>

<pre>
<code>
const gdpr = new GDPR({
    "header": "Cookie Policy",
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
</code>
</pre>
<p> you can add / remove css as you please in the css file</p>
<p> Once configured to your liking you are ready to go</p>

<h3>Contribute</h3>
<p>Feel free to contribute what ever you like</p>
<p>Constructive criticism is appreciated</p>