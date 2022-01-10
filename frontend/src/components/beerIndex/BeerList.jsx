import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, InputLabel, Box, Select, MenuItem, FormControl, Typography } from '@mui/material';
import BeerCard from '../misc/BeerCard';
import { Masonry } from '@mui/lab';
const BeerList = () => {
	const [sortingParam, setSortingParam] = useState('default');
	const [sortingDirection, setSortingDirection] = useState('default');
	const [sortingOption, setSortingOption] = useState(0);

	const navigate = useNavigate();
	const [beers, setBeers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};
			const url = `http://localhost:5000/beers?populate=true&sort=${sortingDirection}&param=${sortingParam}`;
			const response = await fetch(url, requestOptions);
			if (response.status === 401) {
				localStorage.clear();
				navigate('/login');
			}
			const result = await response.json();
			if (!result.payload) return;
			localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];
			setBeers(result.payload || []);
		};
		fetchData();
	}, [sortingParam, sortingDirection]);

	useEffect(() => {
		switch (sortingOption) {
			case 1:
				setSortingParam('name');
				setSortingDirection('ascending');
				break;
			case 2:
				setSortingParam('name');
				setSortingDirection('descending');
				break;
			case 3:
				setSortingParam('type');
				setSortingDirection('ascending');
				break;
			case 4:
				setSortingParam('type');
				setSortingDirection('descending');
				break;
			case 5:
				setSortingParam('abv');
				setSortingDirection('ascending');
				break;
			case 6:
				setSortingParam('abv');
				setSortingDirection('descending');
				break;
			case 7:
				setSortingParam('ibu');
				setSortingDirection('ascending');
				break;
			case 8:
				setSortingParam('ibu');
				setSortingDirection('descending');
				break;
			default:
				setSortingParam('default');
				setSortingDirection('default');
				break;
		}
	}, [sortingOption]);

	return !beers.length ? (
		<LinearProgress />
	) : (
		<Box sx={{ mt: '2em' }}>
			<Typography variant='h1'>The Beer Index</Typography>
			<Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
				biergarten app
			</Typography>
			<FormControl variant='standard' fullWidth>
				<InputLabel id='select-sorting-method'>Sort</InputLabel>
				<Select
					labelId='select-sorting-method'
					id='select-sort'
					value={sortingOption}
					label='Sort'
					onChange={e => setSortingOption(e.target.value)}>
					<MenuItem value={0}>Default sorting</MenuItem>
					<MenuItem value={1}>Sort by name (ascending)</MenuItem>
					<MenuItem value={2}>Sort by name (descending)</MenuItem>
					<MenuItem value={3}>Sort by type (ascending)</MenuItem>
					<MenuItem value={4}>Sort by type (descending)</MenuItem>
					<MenuItem value={5}>Sort by abv (ascending)</MenuItem>
					<MenuItem value={6}>Sort by abv (descending)</MenuItem>
					<MenuItem value={7}>Sort by ibu (ascending)</MenuItem>
					<MenuItem value={8}>Sort by ibu (descending)</MenuItem>
				</Select>
			</FormControl>
			<Masonry
				columns={sortingOption === 0 ? { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } : '1'}
				spacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
				sx={{ mb: 0 }}>
				{beers.map(beer => (
					<BeerCard key={beer.name} beer={beer} />
				))}
			</Masonry>
		</Box>
	);
};
export default BeerList;