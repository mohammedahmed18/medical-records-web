import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ModelAttribute } from '@/api/ml';
import Button from '@/components/buttons/Button';
import SelectInput from '@/components/common/selectInput';
import TextInput from '@/components/common/textInput';

type Props = {
  attributes: ModelAttribute[];
  onSubmit: (data: FieldValues) => void;
};

const ModelAttributesForm = (props: Props) => {
  const { attributes } = props;
  const generateFormSchema = () => {
    const schema: Record<string, yup.Schema> = {};

    attributes?.forEach((attribute) => {
      let baseSchema =
        attribute.type === 'number'
          ? yup
              .number()
              .positive()
              .transform((v) => (isNaN(v) ? 0 : v))
          : yup.string();
      // schema[attribute.label] = baseSchema;

      if (attribute.min) {
        baseSchema = baseSchema.min(Number(attribute.min));
      }

      if (attribute.max) {
        baseSchema = baseSchema.max(Number(attribute.max));
      }

      schema[attribute.label] = baseSchema;
    });

    return schema;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object().shape(generateFormSchema())),
    mode: 'all',
  });

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(props.onSubmit)}
    >
      {attributes?.map((attribute) => {
        if (attribute.type === 'number')
          return (
            <TextInput
              key={attribute.label}
              type='number'
              registeredProps={register(attribute.label)}
              label={attribute.label}
              error={errors[attribute.label]}
              step='any'
            />
          );
        else if (attribute.type === 'select') {
          return (
            <SelectInput
              key={attribute.label}
              options={attribute.selectOptions || []}
              registeredProps={register(attribute.label)}
              formLabel={attribute.label}
              error={errors[attribute.label]}
              setValue={(v) => setValue(attribute.label, v)}
              defaultValue={
                attribute.selectOptions
                  ? attribute.selectOptions[0].value.toString()
                  : ''
              }
            />
          );
        }
        return (
          <TextInput
            key={attribute.label}
            type='string'
            registeredProps={register(attribute.label)}
            label={attribute.label}
            error={errors[attribute.label]}
          />
        );
      })}

      <div className='fit-content ml-auto'>
        <Button variant='primary' size='lg' type='submit'>
          Start the test
        </Button>
      </div>
    </form>
  );
};

export default ModelAttributesForm;
