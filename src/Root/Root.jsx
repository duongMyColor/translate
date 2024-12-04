import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import ListShow from '../components/ListShow';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const HeaderPanel = ({ buttonText, detectedLang, translationLang }) => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			gap: '20px',
			borderBottom: '1px solid #e7e7e7',
			padding: '10px 20px',
		}}
	>
		<Box
			sx={{
				background: '#c7e5fb',
				borderRadius: '7.5px',
				border: '1px solid #e7f3fd',
				width: '92px',
				height: '31px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					fontFamily: "'Inter-SemiBold', sans-serif",
					fontSize: '9px',
					fontWeight: 600,
					color: '#7790ad',
				}}
			>
				{buttonText}
			</Box>
		</Box>
		<Box
			sx={{
				fontFamily: "'Inter-SemiBold', sans-serif",
				fontSize: '8px',
				color: '#bec4ce',
				fontWeight: 600,
			}}
		>
			{detectedLang}
		</Box>
		<Box
			sx={{
				fontFamily: "'Inter-SemiBold', sans-serif",
				fontSize: '8px',
				color: '#bec4ce',
				fontWeight: 600,
			}}
		>
			{translationLang}
		</Box>
		<Box>
			<img
				src="image24.png"
				alt="icon"
				style={{ width: '8px', height: '5px', objectFit: 'cover' }}
			/>
		</Box>
	</Box>
);

const TextInputWithDelete = ({ defaultValue, setInputText }) => (
	<Box
		sx={{
			display: 'flex',
			justifyContent: 'space-between',
			height: '200px',
		}}
	>
		<TextField
			id="standard-multiline-static"
			multiline
			rows={4}
			defaultValue={defaultValue}
			sx={{ width: '100%' }}
			onChange={(e) => setInputText(e.target.value)}
		/>
		<Box sx={{ padding: '10px 20px' }}>
			<img
				src="image21.png"
				alt="delete-icon"
				style={{ width: '8px', height: '9px', objectFit: 'cover' }}
			/>
		</Box>
	</Box>
);

const FooterPanel = ({ charCount }) => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			height: '36px',
			padding: '0px 20px',
		}}
	>
		<Box sx={{ display: 'flex', gap: '20px', padding: '0px 10px' }}>
			<img
				src="image20.png"
				alt="icon1"
				style={{ width: '7px', height: '9px', objectFit: 'cover' }}
			/>
			<img
				src="image19.png"
				alt="icon2"
				style={{ width: '10px', height: '9px', objectFit: 'cover' }}
			/>
		</Box>
		<Box
			sx={{
				fontFamily: "'Inter-SemiBold', sans-serif",
				fontSize: '8px',
				color: '#bec4ce',
				fontWeight: 600,
			}}
		>
			{charCount}
		</Box>
	</Box>
);

const HistorySection = ({ history }) => (
	<Box sx={{ width: '100%' }}>
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '20px',
				borderBottom: '1px solid #e7e7e7',
				justifyContent: 'space-between',
				padding: '0px 20px',
				height: '45px',
				boxShadow:
					'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 6px 0px rgba(0,0,0,0.12)',
			}}
		>
			<Box sx={{ display: 'flex', gap: '10px' }}>
				<img
					src="image13.png"
					alt="history-icon"
					style={{ width: '12px', height: '12px', objectFit: 'cover' }}
				/>
				<Box
					sx={{
						fontFamily: "'Inter-SemiBold', sans-serif",
						fontSize: '12px',
						fontWeight: 600,
						color: '#98b8ee',
					}}
				>
					History
				</Box>

				<img
					src="image13.png"
					alt="history-icon"
					style={{ width: '12px', height: '12px', objectFit: 'cover' }}
				/>
				<Box
					sx={{
						fontFamily: "'Inter-SemiBold', sans-serif",
						fontSize: '12px',
						fontWeight: 600,
						color: '#7a7c81',
					}}
				>
					Save
				</Box>
			</Box>
			<Box
				sx={{
					fontFamily: "'Inter-SemiBold', sans-serif",
					fontSize: '12px',
					color: '#c8cdd6',
					fontWeight: 600,
				}}
			>
				Hide
			</Box>
		</Box>
		<ListShow history={history} />
	</Box>
);

export const Root = () => {
	const inputRef = useRef(null);
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');

	const [history, setHistory] = useState([]);

	const handleTranslate = () => {
		if (inputText == '') return;
		window.electron.translateText(inputText, (result) => {
			setOutputText(result.translated_text || 'Translation error.');
			addTodo(result.translated_text);
		});
	};

	const onchangeInput = (e) => {
		setInputText(e.target.value);
	};

	const addTodo = async (translation) => {
		try {
			const response = await window.electron.addTranslates({
				language: 'English > Vietnamese',
				text: inputText,
				translation: translation,
			});

			const newHistory = [
				...history,
				{
					language: 'English > Vietnamese',
					text: inputText,
					translation: translation,
				},
			];
			setHistory(newHistory);

			console.log({ response });
		} catch (err) {
			console.log({ err });
		}
	};
	const resetInput = () => {
		setInputText('');
		inputRef.current?.focus();
	};
	useEffect(() => {
		if (inputText == '') {
			setOutputText('');
		}
	}, [inputText]);

	useEffect(() => {
		inputRef.current?.focus();
		window.electron
			.getTranslates()
			.then((data) => {
				setHistory(data); // Cập nhật state với dữ liệu nhận được
			})
			.catch((error) => {
				console.error('Error fetching translates:', error);
			});
	}, []);

	return (
		<Box
			sx={{
				background: '#f3f6fb66',
				height: 'fit-content',
				width: 'fit-content',
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				border: '1px solid #e0e0e0',
				boxShadow:
					'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 6px 0px rgba(0,0,0,0.12)',
				// overflowY:'auto' ,
				maxWidth: '1300px',
			}}
		>
			{/* Panel Section */}
			<Box
				sx={{
					display: 'flex',
					position: 'relative',
					border: '1px solid #e0e0e0',
				}}
			>
				{/* Left Panel */}
				<Box sx={{ width: '50%' }}>
					<HeaderPanel
						buttonText="Detect language"
						detectedLang="Ukrainian"
						translationLang="English"
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							height: '200px',
							borderBottom: '1px solid #e0e0e0',
						}}
					>
						<TextField
							id="standard-multiline-static"
							inputRef={inputRef}
							multiline
							rows={6}
							// placeholder="Enter text"
							sx={{
								width: '100%',
								'& .MuiOutlinedInput-root': { border: 'none' },
								'& .MuiOutlinedInput-notchedOutline': {
									border: 'none',
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									border: 'none',
								},
								'& .MuiOutlinedInput-input': { padding: 0 },
							}}
							value={inputText} // Liên kết giá trị với state
							onChange={onchangeInput}
						/>

						<Box
							sx={{ padding: '10px 20px', cursor: 'pointer' }}
							onClick={resetInput}
						>
							<img
								src="image21.png"
								alt="delete-icon"
								style={{
									width: '8px',
									height: '9px',
									objectFit: 'cover',
								}}
							/>
						</Box>
					</Box>
					<FooterPanel charCount="19/5000" />
				</Box>

				<img
					className="image22"
					style={{
						width: '42px',
						height: '42px',
						position: 'absolute',

						top: ' 50%',
						left: '50%',
						transform:
							'translate(-50%, -50%)' /* Đẩy con về chính giữa */,
						objectFit: 'cover',
						cursor: 'pointer',
					}}
					src="image22.png"
					onClick={handleTranslate}
				/>

				{/* Right Panel */}
				<Box sx={{ width: '50%', background: '#f4f7fc' }}>
					<HeaderPanel
						buttonText="Detect language"
						detectedLang="Ukrainian"
						translationLang="English"
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							height: '200px',
							padding: '15px',
							borderBottom: '1px solid #e0e0e0',
						}}
					>
						<Box sx={{ width: '100%', padding: '0 10px' }}>
							{outputText}
						</Box>

						<Box sx={{ padding: '0 20px' }}>
							{/* <StarIcon /> */}
							<StarBorderOutlinedIcon fontSize="small" />
						</Box>
					</Box>
					<FooterPanel charCount="19/5000" />
				</Box>
			</Box>

			{/* History Section */}
			<HistorySection history={history} />
		</Box>
	);
};
