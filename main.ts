namespace nekomimi {

    let distanceBuf = 0

    //% blockId=nekomimi_ultrasonic block="Ultrasonic|pin %pin"
    //% group="Ultrasonic" weight=40
    export function Ultrasonic(pin: DigitalPin): number {
        // send trigger pulse
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin, 0);

        // read echo pulse
        let d = pins.pulseIn(pin, PulseValue.High, 25000);
        let ret = d;

        // filter timeout spikes
        if (ret == 0 && distanceBuf != 0) {
            ret = distanceBuf;
        }
        distanceBuf = d;
        
        return Math.floor(ret * 10 / 6 / 58);
    }

}