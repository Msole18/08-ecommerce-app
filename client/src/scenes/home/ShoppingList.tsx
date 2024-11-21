import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useAppSelector } from "../../hooks/store"
import Item from "../../components/Item"
import useFetchItemsData from '../../hooks/useFetchItemsData'
import { ItemCategory } from "../../types"
import { ITEM_CATEGORY } from "../../constants"


const ShoppingList = () => {
  const breakPoint = useMediaQuery('(min-width:600px)')
  const items = useAppSelector((state) => state.cart.items)
  const { fetchItems } = useFetchItemsData()
  const [value, setValue] = useState<ItemCategory>('all')

  const handleChange = (
    event: React.SyntheticEvent,
    value: ItemCategory
  ) => {
    const newValue = value
    setValue(newValue)
  }

  const filteredItems = useMemo(() => {
    return value === 'all'
      ? items
      : items.filter((item) => item.category === value)
  }, [value, items])
  useEffect(() => {
    fetchItems() 
  }, [])

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        {Object.entries(ITEM_CATEGORY).map(([key, category]) => (
          <Tab key={key} label={category} value={key as ItemCategory} />
        ))}
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {filteredItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  )
}

export default ShoppingList