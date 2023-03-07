import {useEffect, useState} from "react"
import {CreateUpdateForm} from "components/categories/CreateUpdateForm"
import {Box} from "@chakra-ui/react"
import {Categories, Category} from "ordercloud-javascript-sdk"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "constants/app-permissions.config"
import {useRouter} from "next/router"
import {ICategory} from "types/ordercloud/ICategoryXp"

/* This declare the page title and enable the breadcrumbs in the content header section. */
export async function getServerSideProps() {
  return {
    props: {
      header: {
        title: "Edit category",
        metas: {
          hasBreadcrumbs: true,
          hasBuyerContextSwitch: false
        }
      },
      revalidate: 5 * 60
    }
  }
}

const CategoryListItem = (props) => {
  const router = useRouter()
  const [category, setCategory] = useState({} as Category)
  useEffect(() => {
    const categoryid = props.selectedNode?.id || router.query.categoryid
    if (categoryid)
      Categories.Get<ICategory>(router.query.catalogid as string, categoryid).then((category) => {
        setCategory(category)
      })
  }, [props.selectedNode, router.query.catalogid, router.query.categoryid])
  return <>{category?.ID ? <CreateUpdateForm category={category} /> : <div> Loading</div>}</>
}
const ProtectedCategoryListItem = (props) => {
  return (
    <ProtectedContent hasAccess={appPermissions.BuyerManager}>
      <Box padding="20px">
        <CategoryListItem {...props} />
      </Box>
    </ProtectedContent>
  )
}

export default ProtectedCategoryListItem
