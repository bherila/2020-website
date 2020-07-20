import React, {useState} from 'react';
import {useRouter} from "next/router";
import useSWR from 'swr';
import Layout from "../../components/layout";
import DataGrid, {Column} from "devextreme-react/data-grid";
import {Container, Row, Col} from 'reactstrap';
import Form, {Item} from "devextreme-react/form";
import Button from "devextreme-react/button";

const key = '07HZXPDVA6CKI94B';

interface Quote {
	open: number;
	close: number;
	date: string;
	change: number;
	percentChange: number;
}

export default function MaxMin() {
	const router = useRouter();
	const [inputs, setInputs] = useState({
		stockPrice: 0,
		annualizedImpliedVolatility: 1.3,
		daysToExpiration: 5,
	});
	const fetcher = url => fetch(url).then(r => r.json())
	const {data, error, isValidating} = useSWR(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${router.query.symbol}&apikey=${key}&outputsize=full`, fetcher);
	if (error) {
		return <Layout>
			{error}
		</Layout>;
	}
	if (data) {
		const ts = data["Time Series (Daily)"];
		const dates = Object.keys(ts).sort();
		const tableData: Quote[] = [];
		for (let i = 0; i < dates.length; ++i) {
			tableData.push({
				date: dates[i],
				open: parseFloat(ts[dates[i]]["1. open"]),
				close: parseFloat(ts[dates[i]]["4. close"]),
				change: 0,
				percentChange: 0
			});
			const today = tableData[i];
			const yesterday = i > 0 ? tableData[i-1] : null;
			if (yesterday) {
				today.change = today.open - yesterday.close;
				today.percentChange = (today.change) / yesterday.close;
			}
		}

		tableData.sort((a, b) => a.percentChange - b.percentChange);

		const sorted = Array.from(tableData).sort((a, b) => a.percentChange - b.percentChange);

		const sd1 = inputs.stockPrice * inputs.annualizedImpliedVolatility * Math.sqrt(inputs.daysToExpiration / 365);
		const outputs = [
			{
				N_SD: 1,
				SD_Value: sd1,
				Min: inputs.stockPrice - sd1,
				Max: inputs.stockPrice + sd1,
				Percentile: 68.20
			},
			{
				N_SD: 2,
				SD_Value: sd1 * 2,
				Min: inputs.stockPrice - sd1 * 2,
				Max: inputs.stockPrice + sd1 * 2,
				Percentile: 95.40
			},
			{
				N_SD: 3,
				SD_Value: sd1 * 3,
				Min: inputs.stockPrice - sd1 * 3,
				Max: inputs.stockPrice + sd1 * 3,
				Percentile: 99.70
			},
		]

		return <Layout bootstrap={true}>
			<Container>
				<Row>
					<Col sm={6}>
						<DataGrid dataSource={tableData}>
							<Column dataField="date" dataType="date" />
							<Column
								dataField="open"
								dataType="number"
								calculateSortValue={row => parseFloat(row.open)}
								calculateDisplayValue={(row) => row.open && row.open.toFixed(2)}
							/>
							<Column
								dataField="close"
								dataType="number"
								calculateSortValue={row => parseFloat(row.close)}
								calculateDisplayValue={(row) => row.close && row.close.toFixed(2)}
							/>
							<Column
								dataField="change"
								dataType="number"
								calculateSortValue={row => parseFloat(row.change)}
								calculateDisplayValue={(row) => row.change && row.change.toFixed(2)}
							/>
							<Column
								dataField="percentChange"
								dataType="number"
								calculateSortValue={row => parseFloat(row.percentChange)}
								calculateDisplayValue={(row) => row.percentChange && (100 * row.percentChange).toFixed(2) + '%'}
							/>
						</DataGrid>
					</Col>
					<Col sm={6}>
						<h3>Inputs</h3>
						<form onSubmit={(e) => {
							setInputs(Object.assign({}, inputs));
							e.preventDefault();
						}}>
							<Form
								id="form"
								formData={inputs}
								readOnly={false}
								showColonAfterLabel={true}
								labelLocation={"left"}
								colCount={1}
								width={'100%'}
							>
								<Item dataField="stockPrice" editorType="dxNumberBox" />
								<Item dataField="annualizedImpliedVolatility" editorType="dxNumberBox" />
								<Item dataField="daysToExpiration" editorType="dxNumberBox" />
							</Form>
							<Button
								text="Recalculate"
								type="normal"
								stylingMode="outlined"
								useSubmitBehavior={true}
							/>
						</form>
						<DataGrid dataSource={outputs} style={{paddingTop: '1em'}} />
					</Col>
				</Row>
			</Container>
		</Layout>
	}
	return <Layout>
		Loading...
	</Layout>
}
