import { _saveQuestion } from "./_DATA";

describe("_DATA", () => {
  it("returns the correct fields when the question is saved", async () => {
    const mockQuestion = {
      headlineText: "headline",
      optionOneText: "optionOne",
      optionTwoText: "optionTwo",
      author: "zoshikanlu",
    };

    const result = await _saveQuestion(mockQuestion);
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result.author).toBe(mockQuestion.author);
    expect(result.headline).toBe(mockQuestion.headlineText);
    expect(result.optionOne).toEqual({
      votes: [],
      text: mockQuestion.optionOneText,
    });
    expect(result.optionTwo).toEqual({
      votes: [],
      text: mockQuestion.optionTwoText,
    });
  });

  it("will return error when no parameter is provided", async () => {
    await expect(_saveQuestion()).rejects.toBeDefined();
  });

  it("will return error when empty parameter is provided", async () => {
    await expect(_saveQuestion({})).rejects.toBeDefined();
  });

  it("will return error when headline is missing", async () => {
    await expect(
      _saveQuestion({
        optionOneText: "optionOne",
        optionTwoText: "optionTwo",
        author: "sarahedo",
      })
    ).rejects.toBeDefined();
  });

  it("will return error when optionOne is missing", async () => {
    await expect(
      _saveQuestion({
        headlineText: "headline",
        optionTwoText: "optionTwo",
        author: "sarahedo",
      })
    ).rejects.toBeDefined();
  });

  it("will return error when optionTwo is missing", async () => {
    await expect(
      _saveQuestion({
        headlineText: "headline",
        optionOneText: "optionOne",
        author: "sarahedo",
      })
    ).rejects.toBeDefined();
  });

  it("will return error when author is missing", async () => {
    await expect(
      _saveQuestion({
        headlineText: "headline",
        optionOneText: "optionOne",
        optionTwoText: "optionTwo",
      })
    ).rejects.toBeDefined();
  });
});
