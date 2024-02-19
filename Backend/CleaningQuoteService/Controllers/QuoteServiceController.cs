using CleaningQuoteService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace CleaningQuoteService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteServiceController : ControllerBase
    {
        private readonly MyDbContext _context;

        public QuoteServiceController(MyDbContext context)
        {
             _context = context;
        }

        [HttpGet("options/{city}")]
        public async Task<ActionResult<IEnumerable<string>>> GetOptions(string city)
        {
            var optionsCity = await _context.CityOptions.Where(co => co.City == city).Select(co => co.Option).ToListAsync();
            
            if (optionsCity == null || !optionsCity.Any())
            {
                return NotFound("No options found for this city");
            }
                return Ok(optionsCity);
        }

        [HttpPost("calculate")]
        public async Task<ActionResult<decimal>> CalculateQuotation(QuoteRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var city = await _context.Cities.FirstOrDefaultAsync(c => c.Name == request.City);

            if (city == null)
            {
                return NotFound("City not found");
            }

            decimal amount = request.SquareMeters * city.PricePerSquareMeter;

            foreach (string option in request.Options)
            {
                var optionCity= await _context.CityOptions.FirstOrDefaultAsync(co => co.City == request.City && co.Option == option);
                if (optionCity != null)
                {
                amount += optionCity.Price;
                }
            }
            return Ok(amount);
        }       
    }
}

