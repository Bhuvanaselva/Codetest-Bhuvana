namespace CleaningQuoteService.Models
{
    public class QuoteRequest
    {
        public string City { get; set; }
        public decimal SquareMeters { get; set; }
        public List<string> Options { get; set; }
    }
}
