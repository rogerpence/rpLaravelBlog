var rp = rp || {};

rp.typingTracker = (function () {
    function typingTracker(id, maxValue, eventName = 'keyup') {
        if (!document.getElementById(id + '-progress')) {
            insertProgessElements(id, maxValue);
        }
        const MAX_LIMIT = maxValue;
        this.id = id;
        this.element = document.getElementById(id);
        this.progressElement = document.getElementById(this.id + '-progress');
        this.eventName = eventName;
        this.maxValue = maxValue;
        this.counter = 0;

        function insertProgessElements(id, maxValue) {
            let inputElement = document.getElementById(id);
            // If the necessary progress tag doesn't exist, add it.
            let el = document.createElement('progress');
            el.id = inputElement.id + '-progress';
            el.className = 'progress-bar';
            inputElement.insertAdjacentElement('afterend', el);

            el = document.createElement('span');
            el.id = inputElement.id + '-max-value';
            el.style = "font-size: 70%";
            let target = document.getElementById(inputElement.id + '-progress');
            target.insertAdjacentElement('afterend', el);
        };

        this.setProgress = function () {
            // Set progress bar value.
            let charsEntered = this.element.value.length;
            this.progressElement.setAttribute('value', charsEntered);
            // Set characters remaining value.    
            let target = document.getElementById(this.id + '-max-value');
            let charsRemaining = MAX_LIMIT - this.element.value.length;
            target.textContent = `${charsEntered} characters of ${MAX_LIMIT}`;
            //target.textContent = ' characters to go: ' + (MAX_LIMIT - this.element.value.length);
        };

        this.setInitialValues = function () {
            this.element.setAttribute('maxlength', MAX_LIMIT);
            this.progressElement.setAttribute('max', MAX_LIMIT);
        };

        this.addListener = function () {
            // The code inside the addEventListen's 'this' value is the element
            // to which the listener is attached, not this object. By saving
            // 'this' as 'owner' and, thanks to JavaScript closures, the 
            // code inside the addEventListener has the needed reference
            // to be able to call this object's setProgress() method.
            var owner = this;
            this.element.addEventListener(this.eventName, function () {
                if (this.value.length > MAX_LIMIT) {
                    this.value = this.value.substring(0, maxlimit);
                    return false;
                }
                counter = MAX_LIMIT - this.value.length;
                owner.setProgress();
            })
        };

        this.setInitialValues();
        this.addListener();
        this.setProgress();
    };

    return {
        typingTracker: typingTracker
    };
}());