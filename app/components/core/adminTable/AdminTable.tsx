// React core
// External modules / Third-party libraries
import { Flex, IconButton, Table, Badge } from '@radix-ui/themes';
import { Trash2, X } from 'lucide-react';
// Local components
// Hooks and utilities
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from '@/app/components/core/adminTable/AdminTable.module.css';

type TObjectUser = {
	id: number;
	email: string;
	name: string;
	color: string;
	removable: boolean;
	rank: string;
};
type TAdminTableProps = {
	content: Array<{
		id: number;
		email: string;
		name: string;
		password: string;
		rank: string;
	}>;
	handleDelete: (id: number) => void;
};

export const AdminTable = ({ content, handleDelete }: TAdminTableProps) => {
	// Admin table set up
	const completedDatas = dataCompletion(content);
	// JSX
	if (!completedDatas) {
		return null;
	}
	return (
		<Flex gap='4' direction={'column'} className={styles.container}>
			<Table.Root
				variant='surface'
				style={{
					borderRadius: `${settings.NATIVE_COMPONENT_PX_RADIUS}px`,
				}}
			>
				<Table.Header>
					<Table.Row align={'center'}>
						<Table.ColumnHeaderCell justify={'center'}>
							<Trash2
								size={`${settings.ICON_SIZE_M}px`}
								strokeWidth={settings.ICON_STROKE_M}
							/>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell justify={'center'}>
							Id
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell justify={'center'}>
							Email
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell justify={'center'}>
							Name
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell justify={'center'}>
							Rank
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{completedDatas.map((obj: TObjectUser) => {
						const row = (
							<Table.Row key={`row-${obj.id}`} align={'center'}>
								<Table.Cell justify={'center'}>
									<DeleteIcon
										removable={obj.removable}
										onClick={() => handleDelete(obj.id)}
									/>
								</Table.Cell>
								<Table.RowHeaderCell justify={'center'}>
									{obj.id}
								</Table.RowHeaderCell>
								<Table.Cell justify={'center'}>
									{obj.email}
								</Table.Cell>
								<Table.Cell justify={'center'}>
									{obj.name}
								</Table.Cell>
								<Table.Cell justify={'center'}>
									{/* @ts-ignore */}
									<Badge color={obj.color}>{obj.rank}</Badge>
								</Table.Cell>
							</Table.Row>
						);
						return row;
					})}
				</Table.Body>
			</Table.Root>
		</Flex>
	);
};

// Little delete button at the left of the table
type TDeleteIconProps = {
	removable: boolean;
	onClick: () => void;
};

const DeleteIcon = ({ removable, onClick }: TDeleteIconProps) =>
	removable ? (
		<IconButton
			variant={'solid'}
			radius={'full'}
			//! stylme css
			color={'tomato'}
			onClick={onClick}
		>
			<Trash2
				size={settings.ICON_SIZE_M}
				strokeWidth={settings.ICON_STROKE_M}
			/>
		</IconButton>
	) : (
		<X size={settings.ICON_SIZE_M} strokeWidth={settings.ICON_STROKE_M} />
	);

// Function wich add some props to given content
type TDataCompletionProps = {
	id: number;
	email: string;
	name: string;
	password: string;
	rank: string;
};

const dataCompletion = (datas: TDataCompletionProps[]) => {
	if (!Array.isArray(datas) || datas.length === 0) {
		return null;
	}

	return datas.map((obj: TDataCompletionProps) => {
		const { password, rank, ...rest } = obj;
		const color = settings.USERS_CONFIG[rank]['color'];
		const removable = settings.USERS_CONFIG[rank]['removable'];

		return {
			...rest,
			rank,
			color,
			removable,
		};
	});
};
