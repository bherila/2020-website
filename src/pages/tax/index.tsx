import React, {useState} from 'react';
import TaxLayout from "./TaxLayout";
import SelectBox from 'devextreme-react/select-box';
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import usePersist from "./usePersist";
import Employer from "./Employer";
import _ from 'underscore';

function Block(props: {title: string, children: any}) {
	const {title, children} = props;
	return <div>
		<h2>{title}</h2>
		{children}
	</div>
}

const defaultEmployer = [
	{
		name: 'Airbnb',
		payslips: [],
	}
];

function remapW2<T>(data: T[]): T[] {
	if (!Array.isArray(data)) return data;
	return data.map(row => {
		const newData: T = {} as any;
		for (const key of Object.keys(row)) {
			if (key === 'payslips') {
				newData[key] = remapW2(row[key]);
			}
			else {
				let newKey: string = null;
				if (key.indexOf('TM') === 0) {
					newKey = 'TM Travel Coupon';
				}
				newData[newKey || key] = row[key];
			}
		}
		return newData;
	});
}

export default function Tax() {
	const [employerName, setEmployerName] = useState('');
	const sessionEmployers = usePersist('w2', defaultEmployer);
	const [employers, setEmployers] = useState(remapW2(sessionEmployers.data));
	return <TaxLayout>
		<Block title={"Basic information"}>
			<div>Filing status</div>
			<SelectBox items={['Single', 'Married']} />
		</Block>
		<Block title="Employers">
			{employers.map(employer =>
				<Employer
					key={employer.name}
					name={employer.name}
					payslips={employer.payslips}
					setPayslips={(payslips) => {
						const newEmployers = _.uniq(employers.map(emp => {
							if (emp.name === employer.name) {
								emp.payslips = payslips;
							}
							return emp;
						}));
						setEmployers(newEmployers);
						sessionEmployers.setData(newEmployers);
					}}
				/>
			)}
			<TextBox
				placeholder="Employer name"
				value={employerName}
				onValueChanged={(e) => setEmployerName(e.value)}
			/>
			<Button type="normal" text="Add Employer" />
		</Block>
	</TaxLayout>
}
