import type { FormikConfig } from 'formik'

type TSubmitFn<T> = FormikConfig<T>['onSubmit']

export type { TSubmitFn }
