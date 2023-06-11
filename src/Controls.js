
class Controls {
    
    static CLEARID = "clear-btn";
    static QUICKFILLID = "quick-fill-btn";
    static SLOWFILLID = "slow-fill-btn";
    static ADDID = "add-btn";
    static SEARCHID = "search-btn";
    static SLIDERID = "speed-slider";

    
    
    static NODELIMIT = 500;

    constructor(tree) {
        this.tree = tree;
        this.tree.bindControls(this);  

        this.animationInterval = null; 

        
        this.clearBtn = document.getElementById(Controls.CLEARID);
        this.quickFillBtn = document.getElementById(Controls.QUICKFILLID);
        this.slowFillBtn = document.getElementById(Controls.SLOWFILLID);
        this.addBtn = document.getElementById(Controls.ADDID);
        this.searchBtn = document.getElementById(Controls.SEARCHID);
        this.speedSlider = document.getElementById(Controls.SLIDERID);

        
        this.setAnimationSpeed();

        
        this.clearBtn.addEventListener('click',
            () => this.triggerAnimation(this.clear));
        this.quickFillBtn.addEventListener('click',
            () => this.triggerAnimation(this.quickFill));
        this.slowFillBtn.addEventListener('click',
            () => this.triggerAnimation(this.slowFill));
        this.addBtn.addEventListener('click',
            () => this.triggerAnimation(this.add));
        this.searchBtn.addEventListener('click',
            () => this.triggerAnimation(this.search));

        
        this.speedSlider.addEventListener('input', this.setAnimationSpeed.bind(this));
    }

    
    clear() {
        this.tree.clear();
        this.tree.stopAnimation(() => {})
        this.tree.draw();
    }

    
    triggerAnimation(animation) {
        if(this.tree.running) {
            alert('Please wait for the current animation to finish');
        } else {
            
            animation.bind(this)();
        }
    }

    
    getNumber(text) {
        var value = prompt(text);

        if(value === null) {
            return null;
        } else if(isNaN(parseInt(value)) || value === "" || parseInt(value) < 0) {
            alert('Please enter a positive integer');
            return null;
        } else {
            return parseInt(value);
        }
    }

    
    quickFill() {
        var count = this.getNumber("Number of nodes: ");

        if(count !== null && (count < Controls.NODELIMIT ||
                confirm(count + ' nodes may reduce performance. Continue anyways?'))) {
            this.tree.fill(count);
        }
    }

    
    slowFill() {
        var count = this.getNumber("Number of nodes: ");

        if(count !== null && (count < Controls.NODELIMIT ||
                confirm(count + ' nodes may reduce performance. Continue anyways?'))) {
            this.tree.fillVisual(count);
        }
    }

    
    add() {
        var value = this.getNumber("Value to add: ");

        if(value !== null && this.tree.search(value)) {
            alert(value + ' is already in the tree');
        } else if(value !== null){
            this.tree.addValueVisual(value);
        }
    }

    
    search() {
        var value = this.getNumber("Value to search for: ");

        if(value !== null) {
            this.tree.searchVisual(value)
        }
    }

    
    setAnimationSpeed() {
        this.animationInterval= 1000/Math.pow(10, this.speedSlider.value);
    }
}
