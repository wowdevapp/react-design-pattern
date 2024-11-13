import '../App.css'
import MainLayout from './Components/Layout/MainLayout';
import HomePage from './Pages/HomePage';
const App: React.FC = () => {
    return (
        <MainLayout>
            <HomePage />
        </MainLayout>
    );
};

export default App
