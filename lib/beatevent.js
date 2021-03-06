var idCount = 0;

function BeatEvent(heart, interval, name, countTo, settings, fn) {
    this.id = name || 'event_' + (Math.random()).toString(36) + idCount++;
    this.heart = heart;

    this.countTo = countTo || 0;
    this.executionCount = 0;

    this.done = false;
    this.count = 0;
    this.schedule = Math.round(interval, 10);
    this.fn = fn;

    this.settings = settings;
}

BeatEvent.prototype.execute = function() {
    this.count++;

    if (this.count === this.schedule) {
        this.executionCount++;
        if (this.countTo !== 0 && this.executionCount >= this.countTo) {
            this.done = true;
            this.fn(this.settings, this.executionCount, true);
        } else {
            this.fn(this.settings, this.executionCount, false);
        }
        this.count = 0;
    }
};

BeatEvent.prototype.set = function(key, value) {
    this.settings[key] = value;
};

BeatEvent.prototype.get = function(key) {
    return this.settings[key];
};

BeatEvent.prototype.kill = function() {
    this.heart.killEvent(this.id, this);
};

module.exports = BeatEvent;
