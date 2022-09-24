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

import { Product } from '../../types/interface/productPropsInterface';
import { useSession } from 'next-auth/react';
import Reviews from '../../models/Reviews';

//

// we have the content of the products array

//

const AdminPage = () => {
	const { data: session, status } = useSession();
	const [allProducts, setAllProducts] = React.useState<Product[]>([
		{
			_id: '',
			title: '',
			description: '',
			image: '',
			category: '',
			price: 0,
			rating: [],
			reviews: [],
		},
	]);

	// console.log(session.user);

	React.useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await axios.get('/api/admin');

				setAllProducts(data.products);
			} catch (e) {
				console.log(e);
				setAllProducts([]);
			}
		};

		fetchProducts();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columnHelper = createColumnHelper<Product>();

	// COLUMN DEFINITIONS
	const cols: ColumnDef<Product>[] = Object.keys(allProducts[0]).map((key) => ({
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

			// console.log(row);
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
						console.log('product id', row.row.original._id);
						console.log('Column', row.column.id);
						console.log('Prev Value', row.getValue());
						console.log('New Value', e.target.value);

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
		},
		// aggregatedCell is used for formatting cells when aggregated
		// aggregatedCell: (row) => <div>{row[key]}</div>,
		// header and footer used for formating header and footers.
	}));

	// REACT SPECIFIC FUNCTION TO CREATE A TABLE
	const table = useReactTable({
		data: allProducts, // has to be an array, usually of objects
		columns: cols.splice(1, cols.length - 6), // also array of column deifinitons
		getCoreRowModel: getCoreRowModel(), // is required and has to be called once per table
		// defaultColumn - usefull for providing default, cell, header, footer, sorting/filtering/grouping options.
		// initial state - used when reseting various table states either automatically or via functions.
		// autoResetAll
		// meta
		// state
		// onStateChange

		// https://tanstack.com/table/v8/docs/api/core/table
	});

	// console.log(table.getColumn('title'));

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'unauthenticated') return <div> Unauthenticated </div>;

	if (session?.user.access !== 'ADMIN') return <div> Unauthorized </div>;
	if (allProducts.length === 0) {
		return <div>Loading...</div>;
	}
	return (
		<div className={styles.tableContainer}>
			{session && session?.user.access === 'ADMIN' ? (
				<>
					<div> Add product</div>
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
