import { useState, useEffect } from "react";

interface FoodData {
  description: string;
}

interface NutritionApiResponse {
  foods: FoodData[];
}

const FetchNutrition: React.FC = () => {
  const [data, setData] = useState<NutritionApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search`;
    const apiKey = process.env.REACT_APP_USDA_API_KEY;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?api_key=${apiKey}&query=milk&dataType=Survey%20%28FNDDS%29`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData: NutritionApiResponse = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Network response was not ok", error);
        setError("Network response was not ok");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("This is a response", data);
  }, [data]); // This effect runs whenever 'data' changes

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : data ? (
        <div>
          {data.foods.map((food) => (
            <div>
              <h3>{food.description}</h3>
              {/* Display other properties as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchNutrition;
