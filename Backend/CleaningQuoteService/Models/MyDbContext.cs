using Microsoft.EntityFrameworkCore;

namespace CleaningQuoteService.Models
{
    public class MyDbContext : DbContext
    {    
        public MyDbContext(DbContextOptions<MyDbContext> options): base(options)
        {
        }
        public DbSet<City> Cities { get; set; }
        public DbSet<CityOption> CityOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().Property(c => c.PricePerSquareMeter).HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<CityOption>().Property(co => co.Price).HasColumnType("decimal(18, 2)");           
        }
    }
}
    
