import { useState } from "react";

export default function useFormDataRetriever(initialForm) {
  const [formData, setFormData] = useState(initialForm);

  const onFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return {
    formData,
    setFormData,
    onFormInputChange,
  };
}
