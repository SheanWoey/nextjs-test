import { ProductOption } from '@medusajs/medusa';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { onlyUnique } from 'src/utils/onlyUnique';

type Props = {
  option: ProductOption;
  current: string;
  updateOption: (options: Record<string, string>) => void;
};

export default function OptionSelect({ option, current, updateOption }: Props) {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique);

  return (
    <ToggleButtonGroup
      value={current}
      exclusive
      onChange={(_, value) => {
        updateOption({
          [option.id]: value,
        });
      }}
    >
      {filteredOptions.map((value) => (
        <ToggleButton value={value} key={value}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
