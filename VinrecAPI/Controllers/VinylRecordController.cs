#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VinrecAPI.Data;

namespace VinrecAPI.Controllers
{

    [ApiController]
    [EnableCors("VinrecPolicy")]
    [Route("api/[controller]")]
    public class VinylRecordController : ControllerBase
    {
        private readonly DataContext _context;

        public VinylRecordController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VinylRecord>>> GetVinylRecords(string? genre, string? condition,
            string? label, string? status, string? artist, bool? onSale, string? sortBy, string? search, DateTime? releaseDate)
        {
            var vinylRecords = await _context.VinylRecords.ToListAsync();
            if (genre != null)
            {
                vinylRecords = vinylRecords.Where(x => x.Genre.ToLower() == genre.ToLower()).ToList();
            }
            if (condition != null)
            {
                vinylRecords = vinylRecords.Where(x => x.Condition == condition).ToList();
            }
            if (label != null)
            {
                vinylRecords = vinylRecords.Where(x => x.Label == label).ToList();
            }
            if (status != null)
            {
                vinylRecords = vinylRecords.Where(x => x.Status == status).ToList();
            }
            if (artist != null)
            {
                vinylRecords = vinylRecords.Where(x => x.Artist == artist).ToList();
            }
            if (onSale != null && onSale == true)
            {
                vinylRecords = vinylRecords.Where(x => x.OnSale == onSale).ToList();
            }
            if (releaseDate != null)
            {
                vinylRecords = vinylRecords.Where(x => x.ReleaseDate == releaseDate).ToList();
            }
            if (search != null)
            {
                vinylRecords = vinylRecords.Where(x => x.Title.ToLower().Contains(search.ToLower()) || x.Artist.ToLower().Contains(search.ToLower())).ToList();
            }
            if (sortBy != null)
            {
                if (sortBy == "asc")
                {
                    vinylRecords = vinylRecords.OrderBy(x => x.Title).ToList();
                }
                else if (sortBy == "desc")
                {
                    vinylRecords = vinylRecords.OrderByDescending(x => x.Title).ToList();
                }
                else if (sortBy == "newest")
                {
                    vinylRecords = vinylRecords.OrderByDescending(x => x.ReleaseDate).ToList();
                }

                else if (sortBy == "price-asc")
                {
                    vinylRecords = vinylRecords.OrderBy(x => x.CurrentPrice).ToList();
                }
                else if (sortBy == "price-desc")
                {
                    vinylRecords = vinylRecords.OrderByDescending(x => x.CurrentPrice).ToList();
                }
            }
            return vinylRecords;
        }

        [HttpGet("newreleases")]
        public async Task<ActionResult<IEnumerable<VinylRecord>>> GetNewReleases()
        {
            var vinylRecords = await _context.VinylRecords
                                .Where(x => x.ReleaseDate > DateTime.Now.AddMonths(-1))
                                .ToListAsync();
            return vinylRecords;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VinylRecord>> GetVinylRecord(Guid id)
        {
            var vinylRecord = await _context.VinylRecords.FindAsync(id);

            if (vinylRecord == null)
            {
                return NotFound();
            }

            return vinylRecord;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VinylRecord>> CreateVinylRecord(VinylRecord vinylRecord)
        {
            _context.VinylRecords.Add(vinylRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVinylRecord), new { id = vinylRecord.VinylRecordId }, vinylRecord);
        }

        [HttpPost("/add-list")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VinylRecord>> CreateVinylRecords(List<VinylRecord> vinylRecords)
        {
            try
            {
                _context.VinylRecords.AddRange(vinylRecords);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VinylRecord>> UpdateVinylRecord(Guid id, VinylRecord vinylRecord)
        {
            if (id != vinylRecord.VinylRecordId)
            {
                return BadRequest();
            }

            _context.Update(vinylRecord);
            // _context.Entry(vinylRecord).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(vinylRecord);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VinylRecord>> DeleteVinylRecord(Guid id)
        {
            var vinylRecord = await _context.VinylRecords.FindAsync(id);

            if (vinylRecord == null)
            {
                return NotFound();
            }

            _context.VinylRecords.Remove(vinylRecord);
            await _context.SaveChangesAsync();

            return vinylRecord;
        }
    }
}