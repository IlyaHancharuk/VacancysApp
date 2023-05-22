import { FC } from 'react';
import { FiltersFormValuesType } from '../../types';
import { createStyles, Container, Group, SelectItem, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Filters from './Filters/Filters';
import Button from '../Buttons/Button/Button';
import { SearchInput } from '../SearchInput/SearchInput';

type FiltersPropsType = {
    selectItems: SelectItem[]
    onFiltersSubmitCallback(filterValues: FiltersFormValuesType): void
    onSearchSubmitCallback(): void
    disabled: boolean
}

const useStyles = createStyles((theme) => ({
    container: {
        display: 'block',
        padding: 0,
        margin: 0,
        maxWidth: 'inherit',
        position: 'relative',
        zIndex: 1,
        [theme.fn.smallerThan('767')]: {
            display: 'contents',
        },
    },

    filters: {
        width: '100%',
        [theme.fn.smallerThan('1023')]: {
            display: 'none',
        },
    },

    toggler: {
        [theme.fn.largerThan('1023')]: {
            display: 'none',
        },
        [theme.fn.largerThan('767')]: {
            position: 'absolute',
            right: '0',
            top: '-73px',
        },
        
    },

    drawer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }
}));

export const FiltersContainer: FC<FiltersPropsType> = ({
    disabled,
    selectItems,
    onFiltersSubmitCallback,
    onSearchSubmitCallback,
}) => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes } = useStyles();

    return (
        <Container className={classes.container}>
            <Group className={classes.filters}>
                <Filters disabled={disabled}
                    selectItems={selectItems}
                    onSubmitCallback={onFiltersSubmitCallback}
                />
            </Group>

            <Button onClick={toggle} className={classes.toggler} size="m" children={'Фильтры'} />

            <Drawer className={classes.drawer} opened={opened} onClose={close} >
                <SearchInput disabled={disabled}
                    onSubmitCallback={onSearchSubmitCallback}
                    onDrawerClose={close}
                />
                <br />
                <br />
                <Filters disabled={disabled}
                    selectItems={selectItems}
                    onSubmitCallback={onFiltersSubmitCallback}
                    onDrawerClose={close}
                />

            </Drawer>
        </Container>
    );
}
