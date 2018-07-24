import React from 'react';


import {
	Hr, Hg,
	H1, H2, H3, H4, H5, H6,
	Span, Text, I, B,
	Div, Section, Article,
	Ul, Ol, Li,
	Header
} from 'styled/typo'

import {
	Table, 
	TableNative, Tbody, Thead, Tfoot, 
	Tr, Th, Td
} from 'styled/tables'


import {
	Form, 
	Input, TextArea, Select, Option,
	Label
} from 'styled/forms'

import {
	Flex,
	Row,
	Col
} from 'styled/grid'

import { ThemeProvider } from 'styled/settings'



export default () => (
	<React.Fragment>
		<Header>Header</Header>
		<Hr />
		<H1> Header h1 </H1>
		<H2> Header h2 </H2>
		<H3> Header h3 </H3>
		<H4> Header h4 </H4>
		<H5> Header h5 </H5>
		<H6> Header h6 </H6>
		<Hr />
		<Div>
			<Span>Span</Span>
			<Hg />
			<Text> Text </Text>
			<Hg />
			<B> b </B>
			<Hg />
			<I>I</I>
		</Div>
		<Hr />
		<Div> Div </Div>
		<Section> Section </Section>
		<Article> Article </Article>
		<Hr />
		<Ul>
			<Li>item 1</Li>
			<Li>item 2</Li>
			<Li>item 3</Li>
			<Li>item 4</Li>
			<Li>item 5</Li>
		</Ul>
		<Hr />
		<Ol>
			<Li>item 1</Li>
			<Li>item 2</Li>
			<Li>item 3</Li>
			<Li>item 4</Li>
			<Li>item 5</Li>
		</Ol>
		<Hr />
		<Table>
			<Tr>
				<Td>1</Td>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
			<Tr>
				<Td>1</Td>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
			<Tr>
				<Td>1</Td>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
			<Tr>
				<Td>1</Td>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
		</Table>
		<Hr />
		<Table>
			<Tr>
				<Th></Th>
				<Th>2</Th>
				<Th colSpan="2">3</Th>
				<Th>4</Th>
			</Tr>
			<Tr>
				<Th>1</Th>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
			<Tr>
				<Th>1</Th>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
			<Tr>
				<Th>1</Th>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
			<Tr>
				<Th>1</Th>
				<Td>2</Td>
				<Td>3</Td>
				<Td>4</Td>
				<Td>5</Td>
			</Tr>
		</Table>
		<Hr />
		<TableNative>
			<Thead>
				<Tr>
					<Td>1</Td>
					<Td>2</Td>
					<Td>3</Td>
					<Td>4</Td>
					<Td>5</Td>
					<Td>6</Td>
				</Tr>
				<Tr>
					<Td>1</Td>
					<Td>2</Td>
					<Td>3</Td>
					<Td>4</Td>
					<Td>5</Td>
					<Td>6</Td>
				</Tr>
			</Thead>
			<Tfoot>
				<Tr>
					<Td>1</Td>
					<Td>2</Td>
					<Td>3</Td>
					<Td>4</Td>
					<Td>5</Td>
					<Td>6</Td>
				</Tr>
				<Tr>
					<Td>1</Td>
					<Td>2</Td>
					<Td>3</Td>
					<Td>4</Td>
					<Td>5</Td>
					<Td>6</Td>
				</Tr>
			</Tfoot>
			<Tbody>
				<Tr>
					<Td>1</Td>
					<Td>2</Td>
					<Td>3</Td>
					<Td>4</Td>
					<Td>5</Td>
					<Td>6</Td>
				</Tr>
				<Tr>
					<Td>1</Td>
					<Td>2</Td>
					<Td>3</Td>
					<Td>4</Td>
					<Td>5</Td>
					<Td>6</Td>
				</Tr>
			</Tbody>
		</TableNative>
		<Hr />
		<Form>
			<Input id="test" />
			<Input type="number"/>
			<Label htmlFor="test"> label </Label>
			<Input type="date"/>
			<TextArea/>
			<Select>
				<Option>1 option</Option>
				<Option>2 option</Option>
				<Option>3 option</Option>
				<Option>4 option</Option>
				<Option>5 option</Option>
			</Select>
		</Form>
		<Hr />
		<Flex> Flex </Flex>
		<Flex inline> Flex inline</Flex>
		<Flex column> Flex column</Flex>
		<Hr />
		<Row>
			<Col xs={50} sm={25} md={20} lg={15} xl={10} pix={{md:200}}>col1</Col>
			<Col xs={50} sm={25} md={100} lg={15} xl={10}>col2</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10} visible={{
				sm: false,
				md: false,
				xl: true
			}}>col3</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col4</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col5</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col6</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col7</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col8</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col9</Col>
			<Col xs={50} sm={25} md={20} lg={15} xl={10}>col10</Col>
		</Row>
	</React.Fragment>
)