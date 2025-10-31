import * as Slider from "@radix-ui/react-slider";

interface NumberSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const NumberSlider = ({ value, onChange }: NumberSliderProps) => {
  return (
    <Slider.Root
      className="relative flex h-6 w-full touch-none select-none items-center"
      value={value}
      onValueChange={onChange}
      defaultValue={[50]}
      max={100}
      step={1}
    >
      <Slider.Track className="relative w-[401px] h-2 grow rounded-full bg-primary-gray border border-secondary-gray0">
        <Slider.Range className="absolute h-full rounded-full bg-primary-navy" />
      </Slider.Track>
      <Slider.Thumb
        className="focus:outline-none block size-6 rounded-full bg-primary-gray border border-primary-navy hover:cursor-pointer"
        aria-label="Volume"
      />
    </Slider.Root>
  );
};
