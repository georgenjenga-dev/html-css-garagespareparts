import { getSpareParts } from "./getParts";

global.fetch = jest.fn();

describe("getSpareParts", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should fetch spare parts for a car", async () => {
        const mockResponse = {
            parts: [
                { name: "Brake Pads", price: 2500 },
                { name: "Oil Filter", price: 1200 }
            ]
        };

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await getSpareParts("Toyota");

        expect(fetch).toHaveBeenCalledWith(
            "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        );

        expect(result).toEqual(mockResponse.parts);
    });

    test("should throw error if API fails", async () => {
        fetch.mockResolvedValue({
            ok: false
        });

        await expect(getSpareParts("Toyota"))
            .rejects
            .toThrow("Failed to fetch spare parts");
    });

    test("should return empty array if no parts found", async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ parts: [] })
        });