import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to install page
    navigate("/install");
  }, [navigate]);

  return null;
};

export default Index;
