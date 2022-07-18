import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class Slider {
    public constructor(
        private sliderName: HTMLElement,
        private min: number,
        private max: number,
        private step: number
    ) {
        this.sliderName = sliderName;
        this.min = min;
        this.max = max;
        this.step = step;
    }
    public drawSlider(): void {
        noUiSlider.create(this.sliderName, {
            start: [this.min, this.max],
            connect: true,
            range: {
                min: this.min,
                max: this.max,
            },
            step: this.step,
            tooltips: true,
        });
    }
}

export default Slider;
