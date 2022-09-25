import React from 'react';
import styles from './AdminPage.module.css';
import axios from 'axios';
import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import AddIcon from '@mui/icons-material/Add';

import { Product } from '../../types/interface/productPropsInterface';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { modalStyle } from '../individualProductPage/Reviews/Reviews';
import { Button, Modal, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddProductModal from './AddProductModal/AddProductModal';

const AdminPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	//

	const [isAddProductModalOpen, setIsAddProductModalOpen] =
		React.useState(false);
	const [allProducts, setAllProducts] = React.useState<Product[]>([
		{
			_id: '',
			title: '',
			description: '',
			image: '',
			category: 'painting',
			price: 0,
			rating: [],
			reviews: [],
		},
	]);

	// console.log(session.user);

	const fetchProducts = async () => {
		try {
			const { data } = await axios.get('/api/admin');

			setAllProducts(data.products);
		} catch (e) {
			console.log(e);
			setAllProducts([]);
		}
	};

	React.useEffect(() => {
		fetchProducts();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columnHelper = createColumnHelper<Product>();

	// COLUMN DEFINITIONS
	const existentColumns = Object.keys(allProducts[0]).splice(1, 5);
	const cols: ColumnDef<Product>[] = [
		'Index',
		...existentColumns,
		'Delete',
	].map((key) => ({
		// if the header is a string it is used as ID

		header: (props) => (
			<div
				style={{
					padding: '.5em',
					textTransform: 'capitalize',
					fontSize: '1.2rem',
				}}
			>
				{key}
			</div>
		),
		accessorKey: key, // or columnHelper.accessorKey(key) if the row data is an array we will use the index instead.
		// or columnHelper.accessorFn(key) if the row data is an array we will use the index instead.
		// we also have accessorFn if we want to show a computed value as the content of the row cells -- in this case either provide an id or a primitive value header
		// cell is used for formatting cells.
		cell: (row: any) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [value, setValue] = React.useState(row.getValue());

			if (key === 'Delete') {
				return (
					<div style={{ textAlign: 'center' }}>
						<DeleteForeverIcon
							sx={{ cursor: 'pointer' }}
							onClick={async () => {
								if (
									!window.confirm(
										'The product will be deleted permanently. Are you sure you want to proceed?'
									)
								)
									return;

								try {
									const { data } = await axios.delete('/api/admin', {
										data: {
											productId: row.row.original._id,
											userId: session?.user._id,
											productKey: row.row.original.image.split('.com/')[1],
										},
									});
									fetchProducts();
								} catch (e) {
									console.log(e);
								}
							}}
						/>
					</div>
				);
			} else if (key === 'Index') {
				return (
					<span style={{ display: 'flex', justifyContent: 'space-between' }}>
						<p style={{ fontSize: '.8rem' }}> {row.row.id} </p>
						<ArrowForwardIcon
							sx={{
								cursor: 'pointer',
								fontSize: '1rem',
							}}
							color='warning'
							onClick={() => {
								router.push('/product/' + row.row.original._id);
							}}
						/>
					</span>
				);
			} else {
				return (
					<input
						style={{
							backgroundColor: 'inherit',
							color: 'white',
							border: 'none',
							padding: '.2em .5em',
							width: '200px',
							textAlign: 'center',
						}}
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						onBlur={(e) => {
							// .log('product id', row.row.original._id);
							// .log('Column', row.column.id);
							// .log('Prev Value', row.getValue());
							// .log('New Value', e.target.value);

							const updateProduct = async () => {
								try {
									const { data } = await axios.put('/api/admin', {
										productId: row.row.original._id,
										column: row.column.id,
										newValue: e.target.value,
										userId: session?.user._id,
									});
								} catch (e) {
									setValue(row.getValue());
									console.log(e);
								}
							};

							if (e.target.value !== row.getValue()) {
								updateProduct();
							}
						}}
					/>
				);
			}
		},
		// aggregatedCell is used for formatting cells when aggregated
		// aggregatedCell: (row) => <div>{row[key]}</div>,
		// header and footer used for formating header and footers.
	}));

	// REACT SPECIFIC FUNCTION TO CREATE A TABLE
	const table = useReactTable({
		data: allProducts, // has to be an array, usually of objects
		columns: cols, // also array of column deifinitons
		getCoreRowModel: getCoreRowModel(), // is required and has to be called once per table
		// defaultColumn - usefull for providing default, cell, header, footer, sorting/filtering/grouping options.
		// initial state - used when reseting various table states either automatically or via functions.
		// autoResetAll
		// meta
		// state
		// onStateChange

		// https://tanstack.com/table/v8/docs/api/core/table
	});

	// conditionals for page loading

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'unauthenticated') return <div> Unauthenticated </div>;

	if (session?.user.access !== 'ADMIN') return <div> Unauthorized </div>;

	if (allProducts.length === 0) {
		return <div>Loading...</div>;
	}

	//
	return (
		<div className={styles.tableContainer}>
			{session && session?.user.access === 'ADMIN' ? (
				<>
					<Button
						sx={{
							pointerEvents: !session ? 'none' : '',
							// the review button is going outside the review section whem mounted
						}}
						variant='text'
						color='success'
						startIcon={<AddIcon />}
						onClick={() => setIsAddProductModalOpen(true)}
						disabled={!session}
					>
						Add
					</Button>

					<Modal
						open={isAddProductModalOpen}
						onClose={() => setIsAddProductModalOpen(false)}
						aria-labelledby='add-product-modal'
					>
						<Box sx={modalStyle}>
							<AddProductModal
								fetchProducts={fetchProducts}
								setIsAddProductModalOpen={setIsAddProductModalOpen}
							/>
						</Box>
					</Modal>

					<table>
						<thead>
							{table?.getHeaderGroups()?.map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											style={{
												width: '150px',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
						<tfoot>
							{table.getFooterGroups().map((footerGroup) => (
								<tr key={footerGroup.id}>
									{footerGroup.headers.map((header) => (
										<th key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.footer,
														header.getContext()
												  )}
										</th>
									))}
								</tr>
							))}
						</tfoot>
					</table>
				</>
			) : (
				<h1> NOT AUTHROIZED </h1>
			)}
		</div>
	);
};

export default AdminPage;
