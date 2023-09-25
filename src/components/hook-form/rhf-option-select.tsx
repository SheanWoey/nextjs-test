import { ProductOption } from '@medusajs/medusa';
import { Stack, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import OptionSelect from 'src/components/optionSelect';
import { useProductActions } from 'src/hooks/useProduct';

type Props = {
  option: ProductOption;
};

export default function RHFOptionSelect({ option }: Props) {
  const { control } = useFormContext();
  const { updateOptions, options } = useProductActions();

  return (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        {option.title}
      </Typography>

      <Controller
        name={option.id}
        control={control}
        render={({ field }) => (
          <OptionSelect option={option} current={options[option.id]} updateOption={updateOptions} />
        )}
      />
    </Stack>
  );
}
