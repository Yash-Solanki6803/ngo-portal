import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function UserTable() {
  return (
    <Table className="bg-gray-100 rounded-lg ">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black font-bold text-xs xl:text-base py-4 xl:p-4">
            Invoice
          </TableHead>
          <TableHead className="text-black font-bold text-xs xl:text-base py-4 xl:p-4">
            Status
          </TableHead>
          <TableHead className="text-black font-bold text-xs xl:text-base py-4 xl:p-4">
            Method
          </TableHead>
          <TableHead className="text-right text-black font-bold text-xs xl:text-base py-4 xl:p-4">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium text-xs xl:text-base py-4 xl:p-4">
              {invoice.invoice}
            </TableCell>
            <TableCell className="text-xs xl:text-base py-4 xl:p-4">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="text-xs xl:text-base py-4 xl:p-4">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="text-right text-xs xl:text-base py-4 xl:p-4">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
