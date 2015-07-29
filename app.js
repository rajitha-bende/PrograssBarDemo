function ProgressBarsWidget(el, data) {

    var self = this;

    // Encapsulate this. Should be standardised for this widget.
    var template = '#progressBarsWidget';

    self.$el = document.querySelector(el);

    // Bind ractive widget to DOM
    self.ractive = new Ractive({
        el: el,
        template: template,
        data: data
    });

    self.ractive.on('doSelectBar', function (event) {
        self.doSelectBar(event);
    });

    self.ractive.on('doChangeBarValue', function (event) {
        self.doChangeBarValue(event);
    });
}

ProgressBarsWidget.prototype = {

    doSelectBar: function (event) {
        this.ractive.get().bars.map(function (bar) {
            bar.selected = (bar.uid === event.node.value) ? true : false;
        });
        
        this.ractive.set({ bars: this.ractive.get().bars });
    },

    doChangeBarValue: function (event) {

        var value = parseInt(event.node.value, 10);

        this.ractive.get().bars.map(function (bar) {
            if (bar.selected) {
                bar.value += ((bar.value + value) < 0) ? 0 : value;
                bar.cssClass = (bar.value > 100) ? "progress-bar-danger" : "";
            }
        });

        this.ractive.set({ bars: this.ractive.get().bars });
    }
};

data = {
    bars: [
        {value: 25, uid: '#progress1', selected: false},
        {value: 50, uid: '#progress2', selected: true},
        {value: 75, uid: '#progress3', selected: false}
    ],
    buttons: [
        {id: 1, value: '-25'},
        {id: 2, value: '-10'},
        {id: 3, value: '+10'},
        {id: 4, value: '+25'},
    ]
}

w1 = new ProgressBarsWidget('.container', data);