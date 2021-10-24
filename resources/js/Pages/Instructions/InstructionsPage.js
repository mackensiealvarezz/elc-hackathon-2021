import Layout from "@/Layouts/Layout";
import FeatureList from "./FeatureList";

const InstructionsPage = (props) => {
    return (
        <>
            <FeatureList />
        </>
    )
}

InstructionsPage.layout = page => <Layout children={page} title="Welcome" />

export default InstructionsPage;
