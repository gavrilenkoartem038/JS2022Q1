import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class Slider {
    public constructor(
        private sliderName: HTMLElement,
        private min: number,
        private max: number,
        private step: number
    ) {}
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
