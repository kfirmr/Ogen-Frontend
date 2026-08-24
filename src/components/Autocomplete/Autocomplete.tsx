import {
  Box,
  Backdrop,
  TextField as TextFieldMui,
  Autocomplete as AutocompleteMui,
  type AutocompleteRenderInputParams,
} from "@mui/material";

import Close from "../../icons/Close";
import Arrow from "../../icons/Arrow";
import { useStyles } from "./Autocomplete.style";
import { type FC, type SyntheticEvent, useState } from "react";

interface IAutocompleteProps {
  options?: string[];
  disabled?: boolean;
  placeholder?: string;
  value?: string | null;
  noOptionsText?: string;
  isAutocomplete?: boolean;
  onChange?: (value: string | null) => void;
}

const Autocomplete: FC<IAutocompleteProps> = ({
  value = "",
  options = [],
  disabled = false,
  onChange = () => {},
  isAutocomplete = true,
  placeholder = "בחר אופציה",
  noOptionsText = "אין אפשרויות",
}) => {
  const styles = useStyles();

  const [inputValue, setInputValue] = useState("");
  const [isSpotlight, setIsSpotlight] = useState(false);

  const showClearIcon = Boolean(
    (isAutocomplete ? inputValue : value) && !disabled,
  );

  const handleInputChange = (_: SyntheticEvent, newInputValue: string) => {
    if (!isAutocomplete || disabled) return;
    setInputValue(newInputValue);
  };

  const handleSelectChange = (_: SyntheticEvent, newValue: string | null) => {
    if (disabled) return;
    onChange(newValue);
    if (!isAutocomplete) setInputValue(newValue ?? "");
    setIsSpotlight(false);
  };

  const renderInputWithIcons = (
    params: AutocompleteRenderInputParams,
    autoFocus = false,
  ) => (
    <TextFieldMui
      {...params}
      variant="outlined"
      disabled={disabled}
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={isAutocomplete ? inputValue : (value ?? "")}
      sx={styles.textfield({ disabled, isAutocomplete })}
      onFocus={() => !disabled && isAutocomplete && setIsSpotlight(true)}
      onChange={(e) => {
        if (!isAutocomplete || disabled) return;
        setInputValue(e.target.value);
      }}
      slotProps={{
        htmlInput: {
          ...params.slotProps.htmlInput,
          readOnly: !isAutocomplete,
        },
        input: {
          ...params.slotProps.input,
          endAdornment: (
            <Box sx={styles.iconContainer({ disabled })}>
              {showClearIcon && isAutocomplete ? (
                <Close
                  sx={styles.icon({ disabled })}
                  onClick={() => {
                    if (disabled) return;
                    setInputValue("");
                    onChange(null);
                  }}
                />
              ) : (
                <Arrow sx={styles.icon({ disabled })} />
              )}
            </Box>
          ),
        },
      }}
    />
  );
  return (
    <>
      {isAutocomplete ? (
        <>
          <TextFieldMui
            variant="outlined"
            value={inputValue}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={() => !disabled && setIsSpotlight(true)}
            sx={styles.textfield({ disabled, isAutocomplete })}
            slotProps={{
              input: {
                endAdornment: (
                  <Box sx={styles.iconContainer({ disabled })}>
                    {showClearIcon ? (
                      <Close
                        sx={styles.icon({ disabled })}
                        onClick={() => {
                          if (disabled) return;
                          setInputValue("");
                          onChange(null);
                        }}
                      />
                    ) : (
                      <Arrow sx={styles.icon({ disabled })} />
                    )}
                  </Box>
                ),
              },
            }}
          />

          {isSpotlight && (
            <Backdrop
              open
              onClick={() => setIsSpotlight(false)}
              sx={(theme) => styles.backdrop(theme)}
            >
              <div
                style={styles.spotlightTextfield}
                onClick={(e) => e.stopPropagation()}
              >
                <AutocompleteMui
                  freeSolo
                  disablePortal
                  disableClearable
                  options={options}
                  disabled={disabled}
                  value={value || ""}
                  inputValue={inputValue}
                  onChange={handleSelectChange}
                  onInputChange={handleInputChange}
                  renderInput={(params) => renderInputWithIcons(params, true)}
                  slotProps={{
                    listbox: { sx: styles.menuItem },
                    paper: { sx: styles.menuContainer },
                  }}
                />
              </div>
            </Backdrop>
          )}
        </>
      ) : (
        <AutocompleteMui
          disablePortal
          options={options}
          disabled={disabled}
          value={value || ""}
          filterOptions={(x) => x}
          onChange={handleSelectChange}
          noOptionsText={noOptionsText}
          renderInput={(params) => renderInputWithIcons(params)}
          slotProps={{
            listbox: { sx: styles.menuItem },
            paper: { sx: styles.menuContainer },
          }}
        />
      )}
    </>
  );
};

export default Autocomplete;
