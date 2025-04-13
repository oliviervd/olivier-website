
import React, { Component } from "react";

class Pillar extends Component {

    componentDidMount() {
        // Dynamically load p5 to ensure it's client-side only
        import("p5").then(({ default: P5 }) => {
            this.canvas = new P5(this.sketch, this.wrapper); // Initialize p5 with the sketch
            window.addEventListener("resize", this.handleResize);
        });
    }

    componentWillUnmount() {
        if (this.canvas) {
            this.canvas.remove(); // Safely remove canvas
        }
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
        // resize canavas when the window is resized.
        const newHeight = window.innerHeight; // Set height to window height
        this.canvas.resizeCanvas(this.wrapper.offsetWidth, newHeight)
    }

    fetchBgColor = () => {
        // Read the current value of the --bg-color property
        const rootStyles = getComputedStyle(document.documentElement);
        return rootStyles.getPropertyValue('--bg-color') || '#ffffff'; // Default to white if --bg-color is not set
    };

    sketch = (p) => {
        var elementsX = 10;
        var elementsY = 100;
        let var1 = this.props.var1; // Store var1 as a local variable
        let color = p.color("orange")

        if (window.innerWidth <= 600) {
            color = p.color("#f9f1f1")
        }


        // p5.js setup function
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
        };

        // p5.js draw function
        p.draw = () => {

            const bgColor = this.fetchBgColor();
            p.background(p.color(bgColor.trim()));

            p.fill(color);
            p.noStroke();

            p.textFont("IBMPlexMono-Bold");
            p.textAlign(p.CENTER, p.CENTER);

            p.textSize(30);


            for (let y = 0; y < elementsY + 1; y++) {
                for (let x=0; x < elementsX + 1; x++){

                    let posY = p.map(y, 0, elementsY, 0, p.height)
                    let magX = p.map(p.sin(p.radians(posY * var1 + p.frameCount)), -1, 1, -200, 200)
                    let posX = p.map(x, 0, elementsX, -magX, magX);

                    // create matrix
                    p.push();
                    p.translate(p.width/2 + posX, posY);
                    p.text("░",0, 0);
                    p.pop();
                }
            }
        }
        // Function to update var1 and trigger redraw
        p.updateVar1 = (newVar1) => {
            var1 = newVar1;
            p.redraw(); // Redraw the canvas
        };
    }

    componentDidUpdate(prevProps) {
        // If var1 prop has changed, trigger a redraw
        if (prevProps.var1 !== this.props.var1 && this.canvas) {
            this.canvas.updateVar1(this.props.var1);
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', overflowY: 'auto' }} ref={(wrapper) => (this.wrapper = wrapper)}></div>
        )
    }
}

export default Pillar;