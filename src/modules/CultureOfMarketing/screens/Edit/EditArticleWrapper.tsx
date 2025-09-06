import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { object, string } from "yup";
import { useAddComMutation, useGetByIdArticleQuery, useUpdateArticleMutation } from "../../service/CultureOfMarketingServices";
import { showToast } from "src/utils/showToaster";
import CultureOfMarketingLayout from "../../components/CultureOfMarketingLayout";
import { ArticleListResponseType, CultureOfMarketingFormValues } from "../../models/CultureOfMarketing.model";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditArticleWrapper = () => {

  const { id } = useParams();
  const [items, setItems] = useState<ArticleListResponseType>();

  const { data, isFetching, isLoading } = useGetByIdArticleQuery(id, {
    skip: !id
  });

  const [updateArticle] = useUpdateArticleMutation();

  useEffect(() => {
    if (!isLoading || !isFetching) {
      setItems(data?.data)
    }
  }, [])

  const date = new Date();
  const navigate = useNavigate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const formatted = `${year}-${month}-${day}`;

  const initialValues: CultureOfMarketingFormValues = {
    title: items?.title || '',
    image: items?.image || '',
    head: items?.head || '',
    para1: items?.para1 || '',
    date: items?.date || '',
  };

  const validationSchema = object().shape({
    title: string().required("Title is required"),
    head: string().required("Title is required"),
    para1: string().required("description is required"),
    image: string().required("Image is required"),
  });

  const handleSubmit = async (
    values: CultureOfMarketingFormValues,
    { resetForm, setSubmitting }: FormikHelpers<CultureOfMarketingFormValues>
  ) => {
    try {
      await updateArticle({
        id: id,
        body: values
      }).then((res) => {
        if (res?.data?.status) {
          navigate('/articles')
          showToast("success", "Article updated successfully");
        } else {
          showToast("error", res?.data?.message);
        }
      })
      resetForm();
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<CultureOfMarketingFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <CultureOfMarketingLayout
            formikProps={formikProps}
            onClose={() => { }}
            type="EDIT"
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditArticleWrapper;
