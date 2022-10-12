import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Typography,
  Modal,
  styled,
  Badge,
  BadgeProps,
  IconButton,
  Grid,
} from '@mui/material'

import { RootState } from '../redux/store'
import { removeFromCart } from '../redux/slices/cartSlice'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 700,
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

const Cart = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  let { items } = useSelector((state: RootState) => state.cart) as any
  console.log(items)
  if (!Array.isArray(items)) {
    items = []
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const isEmpty = items.length === 0
  return (
    <div>
      <IconButton aria-label="cart" onClick={handleOpen}>
        <StyledBadge badgeContent={items.length} color="primary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="countries-cart"
        aria-describedby="display-chosen-countries"
      >
        <Box sx={style}>
          {isEmpty && (
            <Typography id="countries-cart" variant="h6" component="h2">
              Cart is Empty.
            </Typography>
          )}
          {items.map((item: any) => {
            return (
              <Grid container spacing={8}>
                <Grid item sm={9}>
                  <Typography id="countries-cart" variant="h6" component="h2">
                    {item.name} with population of {item.population}
                  </Typography>
                </Grid>
                <Grid item sm={3}>
                  <Button
                    color="error"
                    onClick={() =>
                      dispatch(removeFromCart({ name: item.name }))
                    }
                  >
                    DELETE
                  </Button>
                </Grid>
              </Grid>
            )
          })}
        </Box>
      </Modal>
    </div>
  )
}

export default Cart
