import { createContext, useContext, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from '@material-ui/core/MenuItem';
import { useFormikContext } from "formik";
import { useGet } from "../../api";
import { SelectField, SelectProps } from "./Field";


const CountryContext = createContext<any>({});

export const CountryProvider: React.FC = ({ children }) => {
    const { data, loading, error } = useGet('/countries');
    const countries = data?.countries || [];

    return <CountryContext.Provider value={{ countries, loading }}>
        {children}
    </CountryContext.Provider>
}

type SelectCountryProps = Omit<SelectProps, "displayEmpty">;

export const SelectCountry: React.FC<SelectCountryProps> = (props) => {
    const { countries, loading } = useContext(CountryContext);

    return <SelectField {...props} displayEmpty>
        <MenuItem value="">
            <em>{loading ? <CircularProgress size='20px' /> : 'None'}</em>
        </MenuItem>
        {
            countries.map((country: any, i: number) => {
                return <MenuItem key={i} value={country.name}>
                    {country.name}</MenuItem>
            })
        }
    </SelectField>
}


type SelectStateProps = SelectCountryProps & { selectedCountry: string };

export const SelectState: React.FC<SelectStateProps> = ({
    selectedCountry, ...props
}) => {
    const { countries, loading } = useContext(CountryContext);

    const country = countries
        .find((country: any) => country.name === selectedCountry);

    return <SelectField {...props} displayEmpty>
        <MenuItem value="">
            <em>{loading ? <CircularProgress size='20px' /> : 'None'}</em>
        </MenuItem>
        {
            country?.states.map((state: string, i: number) => {
                return <MenuItem key={i} value={state}>
                    {state}</MenuItem>
            })
        }
    </SelectField>
}

type SelectBankProps = SelectCountryProps & { country: string };

export const SelectBank: React.FC<SelectBankProps> =
    ({ name, country, ...props }) => {
        const { values, setFieldValue } = useFormikContext();
        const { data, loading } = useGet(`/banks/${country}`);
        const banks = data?.banks || [];

        const selected = (values as any)[name];

        useEffect(() => {
            const selectedBank = banks
                .find((bank: any) => bank.name === selected);

            setFieldValue(`${name}Id`, selectedBank?.id);
            setFieldValue(`${name}Code`, selectedBank?.code);
        }, [selected]);

        return <SelectField name={name} {...props} displayEmpty>
            <MenuItem value="">
                <em>{loading ? <CircularProgress size='20px' /> : 'None'}</em>
            </MenuItem>
            {
                banks.map((bank: any, i: number) => {
                    return <MenuItem key={i} value={bank.name}>
                        {bank.name}</MenuItem>
                })
            }
        </SelectField>
    }

type SelectBankBranchProps = SelectCountryProps & { bankId: string };

export const SelectBankBranch: React.FC<SelectBankBranchProps> =
    ({ name, bankId, ...props }) => {
        const { values, setFieldValue } = useFormikContext();
        const { data, loading, execute } = useGet(`/banks/${bankId}/branches`);
        const branches = data?.branches || [];

        useEffect(() => {
            if (!bankId) return;
            console.log(bankId);
            execute()
        }, [bankId]);

        const selected = (values as any)[name];

        useEffect(() => {
            const selectedBranch = branches
                .find((branch: any) => branch.branch_name === selected);
            setFieldValue(`${name}Code`, selectedBranch?.branch_code);
            setFieldValue(`${name}Id`, selectedBranch?.id);
            setFieldValue(`${name}SwiftCode`, selectedBranch?.swift_code);
            setFieldValue(`${name}Bic`, selectedBranch?.bic);
        }, [selected]);

        return <SelectField name={name} {...props} displayEmpty>
            <MenuItem value="">
                <em>{loading ? <CircularProgress size='20px' /> : 'None'}</em>
            </MenuItem>
            {
                branches.map((branch: any, i: number) => {
                    return <MenuItem key={i} value={branch.branch_name}>
                        {branch.branch_name}</MenuItem>
                })
            }
        </SelectField>
    }
