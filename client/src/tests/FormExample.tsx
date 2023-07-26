import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '@/components/shared/formElements/FormInput/FormInput';

const FormExample = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <FormInput
        aria-label="Test"
        label="Test"
        name="test"
        type="text"
        description="Add a short, descriptive headline"
        width="w-[15.9375rem]"
      />
    </FormProvider>
  );
};

export default FormExample;
