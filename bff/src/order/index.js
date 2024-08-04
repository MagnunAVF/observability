const { z } = require("zod");

const OrderScheme = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  total: z.number().positive(),
  status: z.enum(["created", "pending", "processing", "paid"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  items: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
});

const CreateOrderScheme = OrderScheme.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

module.exports = {
  OrderScheme,
  CreateOrderScheme,
};
