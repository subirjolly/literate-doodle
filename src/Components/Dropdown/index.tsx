import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import './index.scss';

export interface DropdownItem {
    id: string | number
    title: string
    selected?: boolean
}

interface Props {
    items: Array<DropdownItem>
    testID: string

    title?: string
    onChange?: (_: DropdownItem) => void
}

const Dropdown: FC<Props> = ({items: dropdownItems, onChange, title, testID}) => {
    const [items, setItems] = useState<DropdownItem[]>(dropdownItems);
    const itemRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setItems([...dropdownItems]);
    }, [dropdownItems]);

    const handleClickOutside = useCallback((e: any) => {
        if (itemRef.current && !itemRef.current.contains(e.target)) {
            setOpen(false);
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [itemRef]);
    
    useEffect(() => {
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [itemRef, handleClickOutside]);    
    
    const handleOpen = () => {
        document.addEventListener('mousedown', handleClickOutside);
        setOpen(true);
    }
    
    const handleItemClick = (itemID: string | number) => {
        const updated = items.map(item => {
            item.selected = item.id === itemID;
            
            return item;
        });
        
        setItems([...updated]);
        setOpen(false);
        document.removeEventListener('mousedown', handleClickOutside);

        const found = updated.find(item => item.id === itemID);
        onChange && found && onChange({...found});
    }

    const getItems = () => {
        if (!items.length) {
            return (
                <div className={'DropdownItem'} data-testid={`DropdownItem--NoneFound`}>No items found...</div>
            );
        }
        return items.map(item => {
            return (
                <div
                    className='DropdownItem'
                    data-testid={`DropdownItem--${testID}-${item.id}`}
                    key={`DropdownItem--${testID}-${item.id}`}
                    onClick={handleItemClick.bind('', item.id)}
                >
                    {item.title}
                </div>
            )
        })
    }

    const getSelected = () => {
        if (!items.length) {
            return 'Dropdown is Empty!';
        }

        const found = items.find(item => item.selected);
        return found?.title;
    }

    return (
        <div className='DropdownContainer'>
            {
                title && <div className='Title'>{title}</div>
            }
            <div className='Dropdown' ref={itemRef} data-testid={`Dropdown--${testID}`}>
                <div className='Label' onClick={handleOpen}
                    data-testid={`DropdownLabel--${testID}`}
                >
                    {getSelected()}
                </div>
                {
                    isOpen && 
                    <div className='Items' data-testid={`DropdownItems--${testID}`}>
                        {getItems()}
                    </div>
                }
            </div>
        </div>
    );
}

export default Dropdown;
