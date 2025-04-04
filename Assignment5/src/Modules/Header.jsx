/**
 * Header component including title and subtitle.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-3">
                <i className="fas fa-bookmark text-primary" id="jumbotron-icon"></i> iBooks
            </h1>
            <p className="lead">The best book list software!!!</p>
        </div>
    );
}

export default Header;