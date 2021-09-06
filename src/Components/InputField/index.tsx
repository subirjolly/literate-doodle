import {FC, useEffect, useRef, useState} from 'react';
import './index.css';

interface Props {
    label?: string
    testID: string

    value?: string
    placeholder?: string
    onChange?: (_: string) => void
    pattern?: string
    hasFocus?: boolean
}

const InputField: FC<Props> = ({
    label, testID, value, placeholder, onChange, pattern, hasFocus
}) => {
    const [text, setText] = useState(value ?? '');
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (hasFocus && !!inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputRef, hasFocus])

    const handleChange = (e: any) => {
        if (!!pattern) {
            if (!e.target.validity.valid) {
                return;
            }
        }

        setText(e.target.value);
        onChange && onChange(e.target.value);
    }

    return (
        <div className='InputField' data-testid={`InputField--${testID}`}>
            <span className='Label' data-testid={`InputFieldLabel--${testID}`}>{label ?? ''}</span>
            <input ref={inputRef} pattern={pattern} type='text' placeholder={placeholder ?? ''} data-testid={`InputFieldInput--${testID}`} value={text} onChange={handleChange} />
        </div>
    )
};

export default InputField;