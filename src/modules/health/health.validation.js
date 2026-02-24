function validate(validations) {
  return async (req, res, next) => {
    if (!validations || validations.length === 0) return next();
    for (const v of validations) {
      await v.run(req);
    }
    const result = req.validationResult ? await req.validationResult(req) : { isEmpty: () => true };
    if (result.isEmpty && result.isEmpty()) return next();
    return res.status(400).json({ errors: result.array ? result.array() : [] });
  };
}

const healthValidators = {
  getHealth: [],
};

module.exports = { validate, healthValidators };
