import useTitle from '~/hooks/useTitle';

const Title = ({ children, title }) => {
    useTitle(title);
    return children;
};

export default Title;
