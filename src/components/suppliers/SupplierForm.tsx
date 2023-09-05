import {Card, Button, ButtonGroup, CardBody, CardHeader, Container} from "@chakra-ui/react"
import {InputControl, SwitchControl} from "components/react-hook-form"
import {Suppliers} from "ordercloud-javascript-sdk"
import {useRouter} from "hooks/useRouter"
import {ISupplier} from "types/ordercloud/ISupplier"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import ResetButton from "../react-hook-form/reset-button"
import SubmitButton from "../react-hook-form/submit-button"
import {TbChevronLeft} from "react-icons/tb"
import {boolean, object, string} from "yup"
import {useEffect, useState} from "react"
import {useSuccessToast} from "hooks/useToast"
import {getObjectDiff} from "utils"
import useHasAccess from "hooks/useHasAccess"
import {appPermissions} from "config/app-permissions.config"
import ProtectedContent from "../auth/ProtectedContent"

interface SupplierFormProps {
  supplier?: ISupplier
}

export function SupplierForm({supplier}: SupplierFormProps) {
  const isSupplierManager = useHasAccess(appPermissions.SupplierManager)
  const [currentSupplier, setCurrentSupplier] = useState(supplier)
  const [isCreating, setIsCreating] = useState(!supplier?.ID)
  const router = useRouter()
  const successToast = useSuccessToast()

  useEffect(() => {
    setIsCreating(!currentSupplier?.ID)
  }, [currentSupplier?.ID])

  const defaultValues = {
    Active: true
  }

  const validationSchema = object().shape({
    Name: string().required("Name is required"),
    Active: boolean(),
    AllBuyersCanOrder: boolean()
  })

  const {handleSubmit, control, reset} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: supplier || defaultValues,
    mode: "onBlur"
  })

  async function createSupplier(fields: ISupplier) {
    const createdSupplier = await Suppliers.Create<ISupplier>(fields)
    successToast({
      description: "Supplier created successfully."
    })
    router.push(`/suppliers/${createdSupplier.ID}`)
  }

  async function updateSupplier(fields: ISupplier) {
    const diff = getObjectDiff(currentSupplier, fields)
    const createdSupplier = await Suppliers.Patch<ISupplier>(fields.ID, diff)
    successToast({
      description: "Supplier updated successfully."
    })
    setCurrentSupplier(createdSupplier)
    reset(createdSupplier)
  }

  async function onSubmit(fields: ISupplier) {
    if (isCreating) {
      await createSupplier(fields)
    } else {
      await updateSupplier(fields)
    }
  }

  return (
    <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
      <Card as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <ProtectedContent hasAccess={appPermissions.SupplierManager}>
          <CardHeader display="flex" flexWrap="wrap" justifyContent="space-between">
            <Button onClick={() => router.push("/suppliers")} variant="ghost" leftIcon={<TbChevronLeft />}>
              Back
            </Button>
            <ButtonGroup>
              <ResetButton control={control} reset={reset} variant="outline">
                Discard Changes
              </ResetButton>
              <SubmitButton control={control} variant="solid" colorScheme="primary">
                Save
              </SubmitButton>
            </ButtonGroup>
          </CardHeader>
        </ProtectedContent>
        <CardBody display="flex" flexDirection={"column"} gap={4} maxW={{xl: "container.md"}}>
          <SwitchControl
            name="Active"
            label="Active"
            control={control}
            validationSchema={validationSchema}
            isDisabled={!isSupplierManager}
          />
          <InputControl
            name="Name"
            label="Supplier Name"
            control={control}
            validationSchema={validationSchema}
            isDisabled={!isSupplierManager}
          />
          <SwitchControl
            name="AllBuyersCanOrder"
            label="All Buyers Can Order"
            control={control}
            validationSchema={validationSchema}
            isDisabled={!isSupplierManager}
          />
          {!isCreating && (
            <InputControl
              name="DateCreated"
              label="Date created"
              isReadOnly
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isSupplierManager}
            />
          )}
        </CardBody>
      </Card>
    </Container>
  )
}
