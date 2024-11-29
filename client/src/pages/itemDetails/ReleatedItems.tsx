import { Box, Typography } from '@mui/material'
import Item from '../../components/Item'
import { Item as ItemType } from '../../types'

interface RelatedItemsProps {
  relatedItems: ItemType[] | undefined
}

const RelatedItems = ({ relatedItems }: RelatedItemsProps) => {
  return (
    <Box mt="50px" width="100%">
      <Typography variant="h3" fontWeight="bold">
        Related Products
      </Typography>
      <Box
        mt="20px"
        display="flex"
        flexWrap="wrap"
        columnGap="1.33%"
        justifyContent="space-between"
      >
        {relatedItems?.map((item: ItemType, index: number) => (
          <Item key={`${item.name}-${index}`} item={item} />
        ))}
      </Box>
    </Box>
  )
}

export default RelatedItems
